import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class AuthenticatedDto {

    @ApiProperty({type: 'string'})
    @IsNotEmpty()
    @IsString()
    readonly userId: string;

    @ApiProperty({type: 'string'})
    @IsNotEmpty()
    @IsString()
    readonly accessToken: string;

    constructor(
        userId: string,
        accessToken: string
    ) {
        this.userId = userId;
        this.accessToken = accessToken;
    }
}
