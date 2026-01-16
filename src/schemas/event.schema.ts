import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

export enum EventStatus {
    UPCOMING = 'upcoming',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export enum EventCategory {
    FIVE_K = '5K',
    TEN_K = '10K',
    HALF_MARATHON = 'Half Marathon',
    FULL_MARATHON = 'Full Marathon',
    TRAIL = 'Trail',
    FUN_RUN = 'Fun Run',
}

@Schema()
export class Location {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: string;

    @Prop()
    lat: number;

    @Prop()
    lng: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

@Schema({ timestamps: true })
export class Event {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    startTime: string;

    @Prop()
    endTime: string;

    @Prop({ type: LocationSchema, required: true })
    location: Location;

    @Prop({ type: String, enum: EventCategory, required: true })
    category: EventCategory;

    @Prop({ required: true })
    capacity: number;

    @Prop({ default: 0 })
    registeredCount: number;

    @Prop({ required: true })
    price: number;

    @Prop()
    image: string;

    @Prop({ type: String, enum: EventStatus, default: EventStatus.UPCOMING })
    status: EventStatus;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
