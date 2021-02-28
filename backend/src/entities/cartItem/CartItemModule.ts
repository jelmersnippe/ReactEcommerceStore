import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from '../user/UserEntity';
import {CartItemEntity} from './CartItemEntity';
import {CartItemService} from './CartItemService';
import {CartItemController} from './CartItemController';
import {ProductEntity} from '../product/ProductEntity';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        TypeOrmModule.forFeature([
            UserEntity,
            CartItemEntity,
            ProductEntity
        ])
    ],
    providers: [
        CartItemService
    ],
    controllers: [
        CartItemController
    ],
    exports: [
        CartItemService
    ]
})

export class CartItemModule {

}
