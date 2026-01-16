import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import { UserRole } from '../schemas/user.schema';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Post()
    create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
        return this.bookingsService.create(createBookingDto, req.user.userId);
    }

    @Get()
    findAll(@Request() req) {
        return this.bookingsService.findAllByUser(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.bookingsService.findOne(id, req.user.userId);
    }

    @Get('event/:eventId')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    findByEvent(@Param('eventId') eventId: string) {
        return this.bookingsService.findByEvent(eventId);
    }

    @Delete(':id')
    cancel(@Param('id') id: string, @Request() req) {
        return this.bookingsService.cancel(id, req.user.userId);
    }
}
