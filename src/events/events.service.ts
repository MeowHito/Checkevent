import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { CreateEventDto, UpdateEventDto } from './dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    ) { }

    async create(createEventDto: CreateEventDto, userId: string) {
        const event = await this.eventModel.create({
            ...createEventDto,
            createdBy: new Types.ObjectId(userId),
        });
        return event;
    }

    async findAll(query?: {
        category?: string;
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
    }) {
        const filter: any = {};

        if (query?.category) {
            filter.category = query.category;
        }
        if (query?.status) {
            filter.status = query.status;
        }
        if (query?.search) {
            filter.$or = [
                { title: { $regex: query.search, $options: 'i' } },
                { description: { $regex: query.search, $options: 'i' } },
            ];
        }

        const page = query?.page || 1;
        const limit = query?.limit || 10;
        const skip = (page - 1) * limit;

        const [events, total] = await Promise.all([
            this.eventModel
                .find(filter)
                .populate('createdBy', 'name email')
                .sort({ date: 1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.eventModel.countDocuments(filter),
        ]);

        return {
            data: events,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findCalendar(year: number, month: number) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const events = await this.eventModel
            .find({
                date: {
                    $gte: startDate,
                    $lte: endDate,
                },
            })
            .select('title date startTime category status location.name')
            .sort({ date: 1 })
            .exec();

        return {
            year,
            month,
            events,
        };
    }

    async findOne(id: string) {
        const event = await this.eventModel
            .findById(id)
            .populate('createdBy', 'name email')
            .exec();
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        return event;
    }

    async update(id: string, updateEventDto: UpdateEventDto) {
        const event = await this.eventModel
            .findByIdAndUpdate(id, updateEventDto, { new: true })
            .exec();
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        return event;
    }

    async remove(id: string) {
        const event = await this.eventModel.findByIdAndDelete(id).exec();
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        return { message: 'Event deleted successfully' };
    }

    async incrementRegisteredCount(eventId: string) {
        return this.eventModel.findByIdAndUpdate(
            eventId,
            { $inc: { registeredCount: 1 } },
            { new: true },
        );
    }

    async decrementRegisteredCount(eventId: string) {
        return this.eventModel.findByIdAndUpdate(
            eventId,
            { $inc: { registeredCount: -1 } },
            { new: true },
        );
    }
}
