import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(createBookingDto: CreateBookingDto, req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/booking.schema").Booking & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    findAll(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/booking.schema").Booking & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/booking.schema").Booking & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByEvent(eventId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/booking.schema").Booking & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    cancel(id: string, req: any): Promise<{
        message: string;
    }>;
}
