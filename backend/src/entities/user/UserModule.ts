import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserController} from './UserController';
import {UserEntity} from './UserEntity';
import {UserService} from './UserService';
import {PassportModule} from '@nestjs/passport';
import {CartItemEntity} from '../cartItem/CartItemEntity';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        TypeOrmModule.forFeature([
            UserEntity,
            CartItemEntity
        ])
    ],
    providers: [
        UserService
    ],
    controllers: [
        UserController
    ],
    exports: [
        UserService
    ]
})
export class UserModule {

}
