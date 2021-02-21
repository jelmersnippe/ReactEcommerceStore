import {Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ProductEntity} from '../product/ProductEntity';

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id: string;

    @Column({name: 'title', unique: true, type: 'varchar'})
    title: string;

    @Column({name: 'slug', unique: true, type: 'varchar'})
    slug: string;

    @Index()
    @Column({name: 'active', type: 'boolean', default: true})
    active: boolean;

    @Column({name: 'created', type: 'timestamp'})
    created: Date;

    @OneToMany(() => CategoryEntity, (category: CategoryEntity) => category.parentCategory)
    categories: CategoryEntity[];

    @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.categories)
    @JoinColumn({name: 'parent_category_id'})
    parentCategory: CategoryEntity;

    @ManyToMany(() => ProductEntity, (product: ProductEntity) => product.categories)
    @JoinTable({
        name: 'category_product_junction',
        joinColumn: {name: 'category', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'product', referencedColumnName: 'id'}
    })
    products: ProductEntity[];

    constructor(
        category: Partial<CategoryEntity>
    ) {
        Object.assign(this, category);
    }
}
