import {Body, Controller, Delete, Get, HttpCode, Inject, Param, ParseUUIDPipe, Put, Req, UseGuards} from '@nestjs/common';
import {CartItemService} from './CartItemService';
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {CartItemDTO} from './dto/out/CartItemDTO';
import {AuthGuard} from '@nestjs/passport';
import {ProductEntity} from '../product/ProductEntity';
import {UserEntity} from '../user/UserEntity';
import {CreateCartItemDTO} from './dto/in/CreateCartItemDTO';

@ApiTags('cart')
@Controller('cart')
export class CartItemController {

    constructor(
        @Inject(CartItemService) private readonly cartItemService: CartItemService
    ) {

    }

    @ApiBearerAuth()
    @ApiOkResponse({description: '', type: [CartItemDTO]})
    @ApiUnauthorizedResponse()
    @ApiInternalServerErrorResponse()
    @Get('/')
    @UseGuards(AuthGuard())
    @HttpCode(200)
    async findCartItems(@Req() request: { user: UserEntity }): Promise<Array<CartItemDTO>> {
        return await this.cartItemService
            .find(request.user.id)
            .then((cartItems: Array<{ product: ProductEntity, qty: number }>) =>
                cartItems.map((cartItem) =>
                    new CartItemDTO(cartItem.product, cartItem.qty)));
    }

    @ApiBearerAuth()
    @ApiOkResponse({description: '', type: [CartItemDTO]})
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @Put('/')
    @UseGuards(AuthGuard())
    @HttpCode(200)
    async updateCartItem(
        @Req() request: { user: UserEntity },
        @Body() cartItem: CreateCartItemDTO
    ): Promise<Array<CartItemDTO>> {
        await this.cartItemService.updateCartItem(request.user.id, cartItem);

        return this.findCartItems(request);
    }

    @ApiBearerAuth()
    @ApiNoContentResponse({description: ''})
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @Delete('/')
    @UseGuards(AuthGuard())
    @HttpCode(204)
    async emptyCart(@Req() request: { user: UserEntity }): Promise<void> {
        return await this.cartItemService.delete(request.user.id);
    }

    @ApiBearerAuth()
    @ApiNoContentResponse({description: ''})
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @Delete('/:id')
    @UseGuards(AuthGuard())
    @HttpCode(204)
    async removeCartItem(
        @Req() request: { user: UserEntity },
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<void> {
        return await this.cartItemService.deleteItem(request.user.id, id);
    }
}
