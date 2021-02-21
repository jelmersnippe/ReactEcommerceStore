import {Controller, Get, HttpCode, Inject} from '@nestjs/common';
import {CategoryService} from './CategoryService';
import {
    ApiConflictResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {CategoryEntity} from './CategoryEntity';
import {CategoryDTO} from './dto/out/CategoryDTO';

@ApiTags('category')
@Controller('category')
export class CategoryController {

    constructor(
        @Inject(CategoryService) private readonly categoryService: CategoryService
    ) {

    }

    @ApiOkResponse({description: '', type: [CategoryDTO]})
    @ApiUnauthorizedResponse()
    @ApiConflictResponse()
    @ApiInternalServerErrorResponse()
    @Get('/')
    @HttpCode(201)
    async find(): Promise<CategoryDTO[]> {
        return this.categoryService
            .find()
            .then((categories: CategoryEntity[]) => categories.map((category: CategoryEntity) => new CategoryDTO(category)));
    }
}
