import {ApiProperty} from '@nestjs/swagger';
import {UserEntity} from '../UserEntity';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class UserDto {
    @ApiProperty({type: 'string', format: 'uuid'})
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({type: 'string'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({type: 'string'})
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({type: 'string'})
    @IsString()
    @IsNotEmpty()
    lastName: string;

    constructor(
        user: UserEntity
    ) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }
}
