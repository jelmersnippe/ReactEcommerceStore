import {ApiTags} from '@nestjs/swagger';
import {Body, Controller, Inject, Post} from '@nestjs/common';
import {AuthService} from '../auth/AuthService';
import {LoginDto} from '../auth/in/LoginDto';
import {AuthenticatedDto} from '../auth/out/AuthenticatedDto';

@ApiTags('app')
@Controller('app')
export class AppController {
    constructor (
        @Inject(AuthService) private readonly authService: AuthService
    ) {

    }

    @Post('auth/login')
    async login(@Body() login: LoginDto): Promise<AuthenticatedDto> {
        return this.authService
            .login(login.email.toLowerCase(), login.password)
            .then((result: {userId: string, accessToken: string}) => new AuthenticatedDto(result.userId, result.accessToken))
    }
}
