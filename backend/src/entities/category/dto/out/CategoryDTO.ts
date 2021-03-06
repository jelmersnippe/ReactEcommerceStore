import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {CategoryEntity} from '../../CategoryEntity';

export class CategoryDTO {
    @ApiProperty({type: 'string', format: 'uuid'})
    id: string;

    @ApiProperty({type: 'string'})
    title: string;

    @ApiProperty({type: 'string'})
    slug: string;

    @ApiPropertyOptional({type: [CategoryDTO]})
    categories: CategoryDTO[] | undefined;

    constructor(
        category: CategoryEntity
    ) {
        this.id = category.id;
        this.title = category.title;
        this.slug = category.slug;
        this.categories = category.categories?.map((category: CategoryEntity) => new CategoryDTO(category));
    }
}
