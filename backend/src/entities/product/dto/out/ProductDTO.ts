import {ApiProperty} from '@nestjs/swagger';
import {ProductEntity} from '../../ProductEntity';

export class ProductDTO {
    @ApiProperty({type: 'string'})
    id: string;

    @ApiProperty({type: 'string'})
    name: string;

    @ApiProperty({type: 'string'})
    sku: string;

    @ApiProperty({type: 'string'})
    image: string;

    @ApiProperty({type: 'number'})
    price: number;

    @ApiProperty({type: 'number'})
    stock: number;

    constructor(
        product: ProductEntity
    ) {
        this.id = product.id;
        this.name = product.name;
        this.sku = product.sku;
        this.image = product.image;
        this.price = product.price;
        this.stock = product.stock;
    }
}
