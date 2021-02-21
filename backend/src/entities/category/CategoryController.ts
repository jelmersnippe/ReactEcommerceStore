import {Controller, Get, HttpCode, Inject, Param, ParseUUIDPipe} from '@nestjs/common';
import {CategoryService} from './CategoryService';
import {
    ApiInternalServerErrorResponse, ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import {CategoryEntity} from './CategoryEntity';
import {CategoryDTO} from './dto/out/CategoryDTO';
import {ProductEntity} from '../product/ProductEntity';
import {ProductDTO} from '../product/dto/out/ProductDTO';

@ApiTags('category')
@Controller('category')
export class CategoryController {

    constructor(
        @Inject(CategoryService) private readonly categoryService: CategoryService
    ) {

    }

    @ApiOkResponse({description: '', type: [CategoryDTO]})
    @ApiInternalServerErrorResponse()
    @Get('/')
    @HttpCode(200)
    async find(): Promise<CategoryDTO[]> {
        return this.categoryService
            .find()
            .then((categories: CategoryEntity[]) => categories.map((category: CategoryEntity) => new CategoryDTO(category)));
    }

    @ApiOkResponse({description: '', type: [ProductDTO]})
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @Get('/:id/product')
    @HttpCode(200)
    async findProducts(@Param('id', ParseUUIDPipe) id: string,): Promise<ProductDTO[]> {
        return this.categoryService
            .findProducts(id)
            .then((products: ProductEntity[]) => products.map((product: ProductEntity) => new ProductDTO(product)));
    }
}
