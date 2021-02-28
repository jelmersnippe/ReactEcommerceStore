import {ApiProperty} from '@nestjs/swagger';
import {CartItemDTO} from '../../../entities/cartItem/dto/out/CartItemDTO';

export class AuthenticatedDTO {

    @ApiProperty({type: 'string'})
    readonly userId: string;

    @ApiProperty({type: 'string'})
    readonly name: string;

    @ApiProperty({type: 'string'})
    readonly accessToken: string;

    @ApiProperty({type: [CartItemDTO]})
    readonly cart: Array<CartItemDTO>

    constructor(
        userId: string,
        name: string,
        accessToken: string,
        cart: Array<CartItemDTO>
    ) {
        this.userId = userId;
        this.name = name;
        this.accessToken = accessToken;
        this.cart = cart;
    }
}
