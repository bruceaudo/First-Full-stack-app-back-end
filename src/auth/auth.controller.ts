import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDTO } from './DTO';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @Post('register')
    registerUser(@Body() dto: authDTO) { 
        return this.authService.registerUser(dto)
    }
    
    @Post('login')
    loginUser(@Body() dto: authDTO) {
        return this.authService.loginUser(dto)
    }
}
