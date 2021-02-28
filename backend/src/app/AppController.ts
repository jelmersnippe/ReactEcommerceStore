import {ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Body, Controller, Inject, Post} from '@nestjs/common';
import {AuthService} from '../auth/AuthService';
import {LoginDto} from './dto/in/LoginDto';
import {AuthenticatedDTO} from './dto/out/AuthenticatedDTO';
import {CartItemDTO} from '../entities/cartItem/dto/out/CartItemDTO';
import {ProductEntity} from '../entities/product/ProductEntity';
import {CartItemService} from '../entities/cartItem/CartItemService';

@ApiTags('app')
@Controller('app')
export class AppController {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
        @Inject(CartItemService) private readonly cartItemService: CartItemService
    ) {

    }

    @ApiOkResponse({description: '', type: AuthenticatedDTO})
    @ApiUnauthorizedResponse()
    @ApiInternalServerErrorResponse()
    @Post('/auth/login')
    async login(@Body() login: LoginDto): Promise<AuthenticatedDTO & { cart: Array<CartItemDTO> }> {
        const authenticatedObject = await this.authService
            .login(login.email.toLowerCase(), login.password)
            .then((result: { userId: string, name: string, accessToken: string }) => new AuthenticatedDTO(result.userId, result.name, result.accessToken));

        const cart = await this.cartItemService
            .find(authenticatedObject.userId)
            .then((cartItems: Array<{ product: ProductEntity, qty: number }>) =>
                cartItems.map((cartItem) =>
                    new CartItemDTO(cartItem.product, cartItem.qty)));

        return {
            ...authenticatedObject,
            cart
        }
    }
}
