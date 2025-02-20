import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from 'dto/registerUser.dto';
import { AuthService } from '../auth/auth.service';

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
}
