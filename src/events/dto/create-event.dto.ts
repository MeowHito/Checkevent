import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    IsEnum,
    IsDateString,
    ValidateNested,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventCategory, EventStatus } from '../../schemas/event.schema';

class LocationDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsOptional()
    @IsNumber()
    lat?: number;

    @IsOptional()
    @IsNumber()
    lng?: number;
}

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsNotEmpty()
    @IsString()
    startTime: string;

    @IsOptional()
    @IsString()
    endTime?: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;

    @IsNotEmpty()
    @IsEnum(EventCategory)
    category: EventCategory;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    capacity: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsEnum(EventStatus)
    status?: EventStatus;
}
