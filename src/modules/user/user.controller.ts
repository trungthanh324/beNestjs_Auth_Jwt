import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors,Request, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from 'dto/registerUser.dto';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from 'dto/login.dto';
import { AuthGuard } from 'guard/auth.guard';
import { CurrentUser } from 'decorator/currentuser.decorator';
import { RoleGuard } from 'guard/role.guard';
import { UpdateUserDto } from 'dto/updateuser.dto';
import User from 'src/entity/user.entity';

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
    @UseGuards(new RoleGuard(['admin', 'user']))
    @UseGuards(AuthGuard)
    async getAllUser(){
        return await this.userService.getAllUser()
    }

    @Get('/current-user')
    @UseGuards(AuthGuard) // dung decorator se k can viet lai ben service
    getCurrentUser(@CurrentUser() currentUser){
        return currentUser
    }

    @Get('/:id')
    findById(@Param("id") id : string){
        return this.userService.findById(Number(id))
    }

    // @Put('/update')
    // @UseGuards(AuthGuard)
    // updateUser(@Body() updateUser : UpdateUserDto, @Param("id") id : string, @CurrentUser() currentUser: User){
    //     return this.userService.updateUser(updateUser, Number(id), currentUser)
    // }

    @Put('/update')
    @UseGuards(AuthGuard)
    updateUser(@Body() updateUser : UpdateUserDto, @Param("id") id : string){
        return this.userService.updateUser(updateUser, Number(id))
    }

}

