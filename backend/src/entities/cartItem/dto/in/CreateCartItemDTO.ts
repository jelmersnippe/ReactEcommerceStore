import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsUUID} from 'class-validator';

export class CreateCartItemDTO {
    @ApiProperty({type: 'uuid'})
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @ApiProperty({type: 'number'})
    @IsNotEmpty()
    @IsNumber()
    qty: number;
}
