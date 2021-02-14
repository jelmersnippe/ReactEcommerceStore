import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsEmail} from 'class-validator';

export class CreateUserDto {

    @ApiProperty({type: 'string'})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({type: 'string'})
    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @ApiProperty({type: 'string'})
    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @ApiProperty({type: 'string'})
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
