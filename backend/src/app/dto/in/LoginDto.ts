import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LoginDto {

    @ApiProperty({type: 'string'})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({type: 'string'})
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
