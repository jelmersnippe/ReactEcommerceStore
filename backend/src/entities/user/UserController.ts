import {Body, Controller, Delete, Get, HttpCode, Inject, Param, ParseUUIDPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from './in/CreateUserDto';
import {UserService} from './UserService';
import {UserEntity} from './UserEntity';
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {UserDto} from './out/UserDto';
import {AuthGuard} from '@nestjs/passport';
import {UpdateUserDto} from './in/UpdateUserDto';
import {CartItemDTO} from '../cartItem/dto/out/CartItemDTO';
import {ProductEntity} from '../product/ProductEntity';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(
        @Inject(UserService) private readonly userService: UserService
    ) {

    }

    @ApiBearerAuth()
    @ApiOkResponse({description: '', type: UserDto})
    @ApiUnauthorizedResponse()
    @ApiInternalServerErrorResponse()
    @Patch('/:id')
    @UseGuards(AuthGuard())
    @HttpCode(200)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() newUserData: UpdateUserDto
    ): Promise<UserDto> {
        return this.userService
            .update(id, newUserData)
            .then((user: UserEntity) => new UserDto(user));
    }

    @ApiOkResponse({description: '', type: UserDto})
    @ApiUnauthorizedResponse()
    @ApiConflictResponse()
    @ApiInternalServerErrorResponse()
    @Post('/')
    @HttpCode(201)
    async create(@Body() user: CreateUserDto): Promise<UserDto> {
        return this.userService
            .create(user)
            .then((user: UserEntity) => new UserDto(user));
    }

    @ApiBearerAuth()
    @ApiOkResponse({description: '', type: UserDto})
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @Get('/:id')
    @UseGuards(AuthGuard())
    @HttpCode(200)
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
        return this.userService
            .findById(id)
            .then((user: UserEntity) => new UserDto(user));
    }

    @ApiBearerAuth()
    @ApiOkResponse({description: '', type: [UserDto]})
    @ApiUnauthorizedResponse()
    @ApiInternalServerErrorResponse()
    @Get('/')
    @UseGuards(AuthGuard())
    @HttpCode(200)
    async findAll(): Promise<Array<UserDto>> {
        return this.userService
            .findAll()
            .then((users: Array<UserEntity>) => users.map((user: UserEntity) => new UserDto(user)));
    }

    @ApiBearerAuth()
    @ApiOkResponse({description: '', type: UserDto})
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @Delete('/:id')
    @UseGuards(AuthGuard())
    @HttpCode(200)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.userService.remove(id);
    }

    @ApiBearerAuth()
    @ApiOkResponse({description: '', type: [CartItemDTO]})
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @Get('/:id/cartItems')
    @UseGuards(AuthGuard())
    @HttpCode(200)
    async findCartItems(@Param('id', ParseUUIDPipe) id: string): Promise<Array<CartItemDTO>> {
        return await this.userService
            .findCartItems(id)
            .then((cartItems: Array<{product: ProductEntity, qty: number}>) =>
                cartItems.map((cartItem) =>
                    new CartItemDTO(cartItem.product, cartItem.qty)))
    }
}
