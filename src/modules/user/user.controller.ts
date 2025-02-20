import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from 'dto/registerUser.dto';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from 'dto/login.dto';

@Controller('/api/v1/user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly userService: UserService,
                private readonly authService: AuthService
    ){}
    
    @Post('/register')
    registerUser(@Body() registerDto: RegisterUserDto){
        return this.authService.register(registerDto)
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto)
    }

    @Get()
    async getAllUser(){
        return await this.userService.getAllUser()
    }
}
