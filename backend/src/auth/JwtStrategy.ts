import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {AuthService} from './AuthService';
import {UserEntity} from '../entities/user/UserEntity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(AuthService) private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('CONFIG_JWT_SECRET')
        });
    }

    async validate(payload: { id: string }): Promise<UserEntity> {
        return await this.authService.validate(payload.id);
    }
}
