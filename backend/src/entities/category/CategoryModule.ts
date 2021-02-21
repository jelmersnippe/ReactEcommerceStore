import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PassportModule} from '@nestjs/passport';
import {CategoryEntity} from './CategoryEntity';
import {CategoryService} from './CategoryService';
import {CategoryController} from './CategoryController';
import {ProductEntity} from '../product/ProductEntity';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        TypeOrmModule.forFeature([
            CategoryEntity,
            ProductEntity
        ])
    ],
    providers: [
        CategoryService
    ],
    controllers: [
        CategoryController
    ],
    exports: [
        CategoryService
    ]
})
export class CategoryModule {

}
