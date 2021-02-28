import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from '../entities/user/UserModule';
import {AppController} from './AppController';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AuthModule} from '../auth/AuthModule';
import {PassportModule} from '@nestjs/passport';
import {CategoryModule} from '../entities/category/CategoryModule';
import {CartItemModule} from '../entities/cartItem/CartItemModule';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        AuthModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule
            ],
            inject: [
                ConfigService
            ],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('CONFIG_DATABASE_HOST'),
                port: configService.get<number>('CONFIG_DATABASE_PORT'),
                username: configService.get<string>('CONFIG_DATABASE_USERNAME'),
                password: configService.get<string>('CONFIG_DATABASE_PASSWORD'),
                database: configService.get<string>('CONFIG_DATABASE_DATABASE'),
                entities: [
                    'dist/entities/**/*Entity{.ts,.js}',
                    'dist/junctionEntities/**/*JunctionEntity{.ts,.js}'
                ],
                synchronize: false,
                migrationsRun: true,
                migrationsTransactionMode: 'each',
                migrations: [
                    'dist/migrations/*.js'
                ],
                cli: {
                    migrationsDir: 'src/migrations/'
                }
            })
        }),
        UserModule,
        CategoryModule,
        CartItemModule
    ],
    controllers: [
        AppController
    ]
})
export class AppModule {

}
