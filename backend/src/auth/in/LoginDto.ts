import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsEmail} from 'class-validator';

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
