import {Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CategoryEntity} from '../category/CategoryEntity';

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id: string;

    @Column({name: 'name', type: 'varchar'})
    name: string;

    @Index()
    @Column({name: 'sku', type: 'varchar', unique: true})
    sku: string;

    @Column({name: 'image', type: 'varchar', nullable: true})
    image: string;

    @Column({name: 'price', type: 'integer'})
    price: number;

    @Column({name: 'stock', type: 'integer'})
    stock: number;

    @Index()
    @Column({name: 'active', type: 'boolean', default: true})
    active: boolean;

    @Column({name: 'created', type: 'timestamp'})
    created: Date;

    @ManyToMany(() => CategoryEntity, (category: CategoryEntity) => category.products)
    categories: CategoryEntity[];

    constructor(
        product: Partial<ProductEntity>
    ) {
        Object.assign(this, product);
    }
}
