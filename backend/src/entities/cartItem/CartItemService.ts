import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CartItemEntity} from './CartItemEntity';
import {Repository} from 'typeorm';
import {ProductEntity} from '../product/ProductEntity';
import {UserEntity} from '../user/UserEntity';
import {CreateCartItemDTO} from './dto/in/CreateCartItemDTO';

@Injectable()
export class CartItemService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(CartItemEntity) private readonly cartItemRepository: Repository<CartItemEntity>
    ) {

    }

    async find(userId: string): Promise<Array<{ product: ProductEntity, qty: number }>> {
        const userExists: UserEntity | undefined = await this.userRepository.findOne({id: userId});
        if (!userExists) {
            throw new NotFoundException(`User with id ${userId} does not exist`);
        }

        const cartItems = await this.cartItemRepository.createQueryBuilder('cart_item')
            .innerJoinAndSelect('cart_item.product', 'product', 'product.active = :active', {active: true})
            .where('cart_item.active = :active', {active: true})
            .andWhere('cart_item.user_id = :userId', {userId: userId})
            .getMany();

        return cartItems.map((cartItem) => ({
            product: cartItem.product,
            qty: cartItem.qty
        }));
    }

    async delete(userId: string): Promise<void> {
        const userExists: UserEntity | undefined = await this.userRepository.findOne({id: userId});
        if (!userExists) {
            throw new NotFoundException(`User with id ${userId} does not exist`);
        }

        await this.cartItemRepository.delete({userId});
    }

    async deleteItem(userId: string, productId: string): Promise<void> {
        const userExists: UserEntity | undefined = await this.userRepository.findOne({id: userId});
        if (!userExists) {
            throw new NotFoundException(`User with id ${userId} does not exist`);
        }

        await this.cartItemRepository.delete({userId, productId});
    }

    async updateCartItem(userId: string, cartItem: CreateCartItemDTO): Promise<void> {
        const userExists: UserEntity | undefined = await this.userRepository.findOne({where: {id: userId}});
        if (!userExists) {
            throw new NotFoundException(`User with id ${userId} does not exist`);
        }

        const productExists: ProductEntity | undefined = await this.productRepository.findOne({where: {id: cartItem.id}});
        if (!productExists) {
            throw new NotFoundException(`Product with id ${cartItem.id} does not exist`);
        }

        if (cartItem.qty <= 0) {
            await this.deleteItem(userId, cartItem.id);
            return;
        }

        await this.cartItemRepository.save({
            userId: userId,
            productId: cartItem.id,
            qty: cartItem.qty
        });
    }
}
