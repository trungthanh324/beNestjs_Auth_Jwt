import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from 'dto/registerUser.dto';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from 'dto/login.dto';
import { AuthGuard } from 'guard/auth.guard';

@Controller('/api/v1/user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly userService: UserService,
                private readonly authService: AuthService
    ){}
    
    @Post('/register')
    async registerUser(@Body() registerDto: RegisterUserDto){
        return await this.authService.register(registerDto)
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto){
        return await this.authService.login(loginDto)
    }

    @Get()
    @UseGuards(AuthGuard)
    async getAllUser(){
        return await this.userService.getAllUser()
    }

}
