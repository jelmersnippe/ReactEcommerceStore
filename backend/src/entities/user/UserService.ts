import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './UserEntity';
import {CreateUserDto} from './in/CreateUserDto';
import * as bcrypt from 'bcrypt';
import {UpdateUserDto} from './in/UpdateUserDto';
import {CartItemEntity} from '../cartItem/CartItemEntity';
import {ProductEntity} from '../product/ProductEntity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(CartItemEntity) private readonly cartItemRepository: Repository<CartItemEntity>
    ) {

    }

    async update(id: string, newUserData: UpdateUserDto): Promise<UserEntity> {
        const userExists: UserEntity | undefined = await this.userRepository.findOne({id});
        if (!userExists) {
            throw new ConflictException(`User with id ${id} does not exists`);
        }

        await this.userRepository.update({id}, newUserData);

        return await this.userRepository.findOne({id});
    }

    async create(user: CreateUserDto): Promise<UserEntity> {
        const userExists: UserEntity | undefined = await this.userRepository.findOne({email: user.email});
        if (userExists) {
            throw new ConflictException(`User with email ${user.email} already exists`);
        }

        const hashedPassword = await bcrypt.hash(user.password, 1);
        const newUser = new UserEntity({
            ...user,
            password: hashedPassword
        });

        return this.userRepository.save(newUser);
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user: UserEntity | undefined = await this.userRepository.findOne({email});
        if (!user) {
            throw new NotFoundException(`User with id ${email} does not exist`);
        }

        return user;
    }

    async findById(id: string): Promise<UserEntity> {
        const user: UserEntity | undefined = await this.userRepository.findOne({id});
        if (!user) {
            throw new NotFoundException(`User with id ${id} does not exist`);
        }

        return user;
    }

    async remove(id: string): Promise<void> {
        const userExists: UserEntity | undefined = await this.userRepository.findOne({id});
        if (!userExists) {
            throw new NotFoundException(`User with id ${id} does not exist`);
        }

        await this.userRepository.delete({id});
    }

    async findCartItems(id: string): Promise<Array<{product: ProductEntity, qty: number}>> {
        const userExists: UserEntity | undefined = await this.userRepository.findOne({id});
        if (!userExists) {
            throw new NotFoundException(`User with id ${id} does not exist`);
        }

        const cartItems = await this.cartItemRepository.createQueryBuilder("cart_item")
            .innerJoinAndSelect("cart_item.product", "product", "product.active = :active", {active: true})
            .where("cart_item.active = :active", { active: true })
            .andWhere("cart_item.user_id = :userId", {userId: id})
            .getMany();

        console.log(cartItems);

        return cartItems.map((cartItem) => ({
            product: cartItem.product,
            qty: cartItem.qty
        }))
    }
}
