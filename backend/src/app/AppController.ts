import {ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Body, Controller, Inject, Post} from '@nestjs/common';
import {AuthService} from '../auth/AuthService';
import {LoginDto} from './dto/in/LoginDto';
import {AuthenticatedDTO} from './dto/out/AuthenticatedDTO';

@ApiTags('app')
@Controller('app')
export class AppController {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService
    ) {

    }

    @ApiOkResponse({description: '', type: AuthenticatedDTO})
    @ApiUnauthorizedResponse()
    @ApiInternalServerErrorResponse()
    @Post('/auth/login')
    async login(@Body() login: LoginDto): Promise<AuthenticatedDTO> {
        return this.authService
            .login(login.email.toLowerCase(), login.password)
            .then((result: { userId: string, name: string, accessToken: string }) => new AuthenticatedDTO(result.userId, result.name, result.accessToken));
    }
}
