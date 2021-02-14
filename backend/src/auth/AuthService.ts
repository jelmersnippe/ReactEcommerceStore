import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {AuthenticatedDto} from './out/AuthenticatedDto';
import {UserEntity} from '../entities/user/UserEntity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {compareSync} from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @Inject(JwtService) private readonly jwtService: JwtService
    ) {

    }

    async validate(userId: string): Promise<UserEntity> {
        const existingUser: UserEntity | undefined = await this.userRepository
            .findOne({where: {active: true, id: userId}});

        if (!existingUser) {
            throw new UnauthorizedException(`UserId ${userId} is unauthorized`);
        }

        return existingUser;
    }

    async login(email: string, password: string): Promise<AuthenticatedDto> {
        const existingUser : UserEntity | undefined = await this.userRepository.createQueryBuilder()
            .where('LOWER(email) = LOWER(:email)', {email})
            .andWhere('active = true')
            .getOne();

        if (!existingUser || !compareSync(password, existingUser.password)) {
            throw new UnauthorizedException(`User ${email} is unauthorized`);
        }

        return {
            userId: existingUser.id,
            accessToken: this.jwtService.sign({id: existingUser.id}),
        };
    }
}
