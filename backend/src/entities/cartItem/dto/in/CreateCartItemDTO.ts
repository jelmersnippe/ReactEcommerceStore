import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsUUID} from 'class-validator';

export class CreateCartItemDTO {
    @ApiProperty({type: 'string', format: 'uuid'})
    @IsNotEmpty()
    @IsUUID(4)
    id: string;

    @ApiProperty({type: 'number'})
    @IsNotEmpty()
    @IsNumber()
    qty: number;
}
