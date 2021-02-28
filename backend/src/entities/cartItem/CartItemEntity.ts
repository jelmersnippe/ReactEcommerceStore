import {Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {UserEntity} from '../user/UserEntity';
import {ProductEntity} from '../product/ProductEntity';

@Index(['userId', 'productId'], {unique: true})
@Entity('cart_item')
export class CartItemEntity {
    @PrimaryColumn({name: 'user_id', type: 'uuid'})
    userId: string;

    @PrimaryColumn({name: 'product_id', type: 'uuid'})
    productId: string;

    @Column({name: 'qty', type: 'integer'})
    qty: number;

    @Index()
    @Column({name: 'active', type: 'boolean', default: true})
    active: boolean;

    @CreateDateColumn({name: 'created', type: 'timestamp'})
    created: Date;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.cartItems)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.cartItems)
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;

    constructor(
        cartItem: Partial<CartItemEntity>
    ) {
        Object.assign(this, cartItem);
    }
}
