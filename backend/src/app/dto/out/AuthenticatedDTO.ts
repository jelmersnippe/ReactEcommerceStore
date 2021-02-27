import {ApiProperty} from '@nestjs/swagger';

export class AuthenticatedDTO {

    @ApiProperty({type: 'string'})
    readonly userId: string;

    @ApiProperty({type: 'string'})
    readonly name: string;

    @ApiProperty({type: 'string'})
    readonly accessToken: string;

    constructor(
        userId: string,
        name: string,
        accessToken: string
    ) {
        this.userId = userId;
        this.name = name;
        this.accessToken = accessToken;
    }
}
