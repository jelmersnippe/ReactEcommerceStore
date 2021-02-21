import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsOptional, IsString} from 'class-validator';

export class UpdateUserDto {

    @ApiProperty({type: 'string'})
    @IsOptional()
    @IsEmail()
    readonly email: string;

    @ApiProperty({type: 'string'})
    @IsOptional()
    @IsString()
    readonly firstName: string;

    @ApiProperty({type: 'string'})
    @IsOptional()
    @IsString()
    readonly lastName: string;
}
