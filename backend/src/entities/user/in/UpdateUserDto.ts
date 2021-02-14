import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsEmail, IsOptional} from 'class-validator';

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
