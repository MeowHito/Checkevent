import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument, BookingStatus } from '../schemas/booking.schema';
import { Event, EventDocument, EventStatus } from '../schemas/event.schema';
import { CreateBookingDto } from './dto';

@Injectable()
export class BookingsService {
    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
        @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    ) { }

    private generateRegistrationNumber(): string {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `REG-${timestamp}-${random}`;
    }

    async create(createBookingDto: CreateBookingDto, userId: string) {
        const { eventId } = createBookingDto;

        // Check if event exists
        const event = await this.eventModel.findById(eventId);
        if (!event) {
            throw new NotFoundException('Event not found');
        }

        // Check if event is available for booking
        if (event.status !== EventStatus.UPCOMING) {
            throw new BadRequestException('Event is not available for booking');
        }

        // Check capacity
        if (event.registeredCount >= event.capacity) {
            throw new BadRequestException('Event is fully booked');
        }

        // Check if user already booked this event
        const existingBooking = await this.bookingModel.findOne({
            user: new Types.ObjectId(userId),
            event: new Types.ObjectId(eventId),
            status: { $ne: BookingStatus.CANCELLED },
        });

        if (existingBooking) {
            throw new ConflictException('You have already booked this event');
        }

        // Create booking
        const booking = await this.bookingModel.create({
            user: new Types.ObjectId(userId),
            event: new Types.ObjectId(eventId),
            registrationNumber: this.generateRegistrationNumber(),
            status: BookingStatus.CONFIRMED,
        });

        // Update event registered count
        await this.eventModel.findByIdAndUpdate(eventId, {
            $inc: { registeredCount: 1 },
        });

        return this.bookingModel
            .findById(booking._id)
            .populate('event', 'title date startTime location category')
            .exec();
    }

    async findAllByUser(userId: string) {
        return this.bookingModel
            .find({ user: new Types.ObjectId(userId) })
            .populate('event', 'title date startTime location category status image')
            .sort({ createdAt: -1 })
            .exec();
    }

    async findOne(id: string, userId: string) {
        const booking = await this.bookingModel
            .findOne({
                _id: new Types.ObjectId(id),
                user: new Types.ObjectId(userId),
            })
            .populate('event')
            .exec();

        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        return booking;
    }

    async findByEvent(eventId: string) {
        return this.bookingModel
            .find({
                event: new Types.ObjectId(eventId),
                status: { $ne: BookingStatus.CANCELLED },
            })
            .populate('user', 'name email phone')
            .sort({ createdAt: 1 })
            .exec();
    }

    async cancel(id: string, userId: string) {
        const booking = await this.bookingModel.findOne({
            _id: new Types.ObjectId(id),
            user: new Types.ObjectId(userId),
        });

        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        if (booking.status === BookingStatus.CANCELLED) {
            throw new BadRequestException('Booking is already cancelled');
        }

        // Update booking status
        booking.status = BookingStatus.CANCELLED;
        await booking.save();

        // Decrement event registered count
        await this.eventModel.findByIdAndUpdate(booking.event, {
            $inc: { registeredCount: -1 },
        });

        return { message: 'Booking cancelled successfully' };
    }
}
