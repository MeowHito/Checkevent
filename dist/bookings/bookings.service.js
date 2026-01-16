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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_schema_1 = require("../schemas/booking.schema");
const event_schema_1 = require("../schemas/event.schema");
let BookingsService = class BookingsService {
    bookingModel;
    eventModel;
    constructor(bookingModel, eventModel) {
        this.bookingModel = bookingModel;
        this.eventModel = eventModel;
    }
    generateRegistrationNumber() {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `REG-${timestamp}-${random}`;
    }
    async create(createBookingDto, userId) {
        const { eventId } = createBookingDto;
        const event = await this.eventModel.findById(eventId);
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (event.status !== event_schema_1.EventStatus.UPCOMING) {
            throw new common_1.BadRequestException('Event is not available for booking');
        }
        if (event.registeredCount >= event.capacity) {
            throw new common_1.BadRequestException('Event is fully booked');
        }
        const existingBooking = await this.bookingModel.findOne({
            user: new mongoose_2.Types.ObjectId(userId),
            event: new mongoose_2.Types.ObjectId(eventId),
            status: { $ne: booking_schema_1.BookingStatus.CANCELLED },
        });
        if (existingBooking) {
            throw new common_1.ConflictException('You have already booked this event');
        }
        const booking = await this.bookingModel.create({
            user: new mongoose_2.Types.ObjectId(userId),
            event: new mongoose_2.Types.ObjectId(eventId),
            registrationNumber: this.generateRegistrationNumber(),
            status: booking_schema_1.BookingStatus.CONFIRMED,
        });
        await this.eventModel.findByIdAndUpdate(eventId, {
            $inc: { registeredCount: 1 },
        });
        return this.bookingModel
            .findById(booking._id)
            .populate('event', 'title date startTime location category')
            .exec();
    }
    async findAllByUser(userId) {
        return this.bookingModel
            .find({ user: new mongoose_2.Types.ObjectId(userId) })
            .populate('event', 'title date startTime location category status image')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findOne(id, userId) {
        const booking = await this.bookingModel
            .findOne({
            _id: new mongoose_2.Types.ObjectId(id),
            user: new mongoose_2.Types.ObjectId(userId),
        })
            .populate('event')
            .exec();
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return booking;
    }
    async findByEvent(eventId) {
        return this.bookingModel
            .find({
            event: new mongoose_2.Types.ObjectId(eventId),
            status: { $ne: booking_schema_1.BookingStatus.CANCELLED },
        })
            .populate('user', 'name email phone')
            .sort({ createdAt: 1 })
            .exec();
    }
    async cancel(id, userId) {
        const booking = await this.bookingModel.findOne({
            _id: new mongoose_2.Types.ObjectId(id),
            user: new mongoose_2.Types.ObjectId(userId),
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.status === booking_schema_1.BookingStatus.CANCELLED) {
            throw new common_1.BadRequestException('Booking is already cancelled');
        }
        booking.status = booking_schema_1.BookingStatus.CANCELLED;
        await booking.save();
        await this.eventModel.findByIdAndUpdate(booking.event, {
            $inc: { registeredCount: -1 },
        });
        return { message: 'Booking cancelled successfully' };
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(1, (0, mongoose_1.InjectModel)(event_schema_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map