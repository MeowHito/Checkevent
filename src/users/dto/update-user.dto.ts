import { IsOptional, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../../schemas/user.schema';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
