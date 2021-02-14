import {Controller, Get, HttpCode, Inject, UseGuards} from '@nestjs/common';
import {CategoryService} from './CategoryService';
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {CategoryEntity} from './CategoryEntity';
import {CategoryDTO} from './dto/out/CategoryDTO';

@ApiTags('category')
@Controller('category')
export class CategoryController {

    constructor(
        @Inject(CategoryService) private readonly categoryService: CategoryService
    ) {

    }

    @ApiBearerAuth()
    @ApiOkResponse({description: '', type: [CategoryDTO]})
    @ApiUnauthorizedResponse()
    @ApiConflictResponse()
    @ApiInternalServerErrorResponse()
    @Get('/')
    @UseGuards(AuthGuard())
    @HttpCode(201)
    async find(): Promise<CategoryDTO[]> {
        return this.categoryService
            .find()
            .then((categories: CategoryEntity[]) => categories.map((category: CategoryEntity) => new CategoryDTO(category)));
    }
}
