import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CategoryEntity} from './CategoryEntity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
    ) {

    }

    async find(): Promise<CategoryEntity[]> {
        const relations: string[] = ['categories'];

        return await this.categoryRepository.find({where: {active: true}, relations: relations});
    }
}
