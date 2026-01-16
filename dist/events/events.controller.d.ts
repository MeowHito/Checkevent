import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/event.schema").EventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/event.schema").Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(category?: string, status?: string, search?: string, page?: string, limit?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../schemas/event.schema").EventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/event.schema").Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findCalendar(year: string, month: string): Promise<{
        year: number;
        month: number;
        events: (import("mongoose").Document<unknown, {}, import("../schemas/event.schema").EventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/event.schema").Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/event.schema").EventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/event.schema").Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/event.schema").EventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/event.schema").Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
