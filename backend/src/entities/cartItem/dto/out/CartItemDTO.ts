import {ApiProperty} from '@nestjs/swagger';
import {ProductDTO} from '../../../product/dto/out/ProductDTO';
import {ProductEntity} from '../../../product/ProductEntity';

export class CartItemDTO {
    @ApiProperty({type: ProductDTO})
    product: ProductDTO;

    @ApiProperty({type: 'number'})
    qty: number;

    constructor(
        product: ProductEntity,
        qty: number
    ) {
        this.product = new ProductDTO(product);
        this.qty = qty;
    }
}
