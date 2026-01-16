"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_schema_1 = require("../schemas/event.schema");
let EventsService = class EventsService {
    eventModel;
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    async create(createEventDto, userId) {
        const event = await this.eventModel.create({
            ...createEventDto,
            createdBy: new mongoose_2.Types.ObjectId(userId),
        });
        return event;
    }
    async findAll(query) {
        const filter = {};
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
    async findCalendar(year, month) {
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
    async findOne(id) {
        const event = await this.eventModel
            .findById(id)
            .populate('createdBy', 'name email')
            .exec();
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async update(id, updateEventDto) {
        const event = await this.eventModel
            .findByIdAndUpdate(id, updateEventDto, { new: true })
            .exec();
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async remove(id) {
        const event = await this.eventModel.findByIdAndDelete(id).exec();
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return { message: 'Event deleted successfully' };
    }
    async incrementRegisteredCount(eventId) {
        return this.eventModel.findByIdAndUpdate(eventId, { $inc: { registeredCount: 1 } }, { new: true });
    }
    async decrementRegisteredCount(eventId) {
        return this.eventModel.findByIdAndUpdate(eventId, { $inc: { registeredCount: -1 } }, { new: true });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_schema_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventsService);
//# sourceMappingURL=events.service.js.map