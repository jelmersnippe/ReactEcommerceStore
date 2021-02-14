import { Module } from '@nestjs/common';
import { AuthService } from './AuthService';
import {JwtStrategy} from './JwtStrategy';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {UserEntity} from '../entities/user/UserEntity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([
            UserEntity
        ]),
        JwtModule.registerAsync({
            imports: [
                ConfigModule
            ],
            inject: [
                ConfigService
            ],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('CONFIG_JWT_SECRET')
            }),
        }),
    ],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {

}
