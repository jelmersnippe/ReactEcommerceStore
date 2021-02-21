import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CategoryEntity} from './CategoryEntity';
import {ProductEntity} from '../product/ProductEntity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
    ) {

    }

    async find(): Promise<CategoryEntity[]> {
        const relations: string[] = ['categories', 'categories.categories'];

        return await this.categoryRepository.find({where: {active: true, parentCategory: null}, relations: relations});
    }

    async findProducts(categoryId: string): Promise<ProductEntity[]> {
        const existingCategory: CategoryEntity = await this.categoryRepository.findOne({where: {active: true, id: categoryId}});

        if (!existingCategory) {
            throw new NotFoundException(`Category with id ${categoryId} does not exists`);
        }

        // TODO: Also get products in child categories
        return await this.productRepository.createQueryBuilder("product")
            .innerJoin("category_product_junction", "junction", "junction.category_id = :categoryId", {categoryId: categoryId})
            .where("product.active = :active", { active: true })
            .andWhere("junction.active = :active", {active: true})
            .getMany();
    }
}
