import { EventCategory, EventStatus } from '../../schemas/event.schema';
declare class LocationDto {
    name: string;
    address: string;
    lat?: number;
    lng?: number;
}
export declare class CreateEventDto {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime?: string;
    location: LocationDto;
    category: EventCategory;
    capacity: number;
    price: number;
    image?: string;
    status?: EventStatus;
}
export {};
