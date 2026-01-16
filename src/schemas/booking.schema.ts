import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

export enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Booking {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
    event: Types.ObjectId;

    @Prop({ type: String, enum: BookingStatus, default: BookingStatus.PENDING })
    status: BookingStatus;

    @Prop({ required: true, unique: true })
    registrationNumber: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
