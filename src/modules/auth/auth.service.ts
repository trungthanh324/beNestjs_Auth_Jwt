import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'dto/registerUser.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
                private readonly userService: UserService
    ) {}

    login(){
        return `login`
    }

    async register(registerDto: RegisterUserDto){
        try {
        //B1: check email ton tai hay chua?
        const findByEmail = await this.userService.findByEmail(registerDto.email)
        if(findByEmail){
            throw new BadRequestException('Email exist')
        }
        //B2: hash pass
        const hashPassword = await bcrypt.hash(registerDto.hashedPassword, 10);
        registerDto.hashedPassword = hashPassword
        //B3: save -> db
        const saveUser = await this.userService.createUser(registerDto)
        //B4: generate jwt token
        const payload = {
            id: saveUser.id,
            firstName: saveUser.firstName,
            lastName: saveUser.lastName,
            role: saveUser.role
        }
        const accessToken = await this.jwtService.signAsync(payload,{secret: process.env.JWT_SECRET})
        return {msg: "User created!", accessToken}
        } catch (error) {
            if(error instanceof BadRequestException){
                throw error
            }
            throw new BadRequestException('Something went wrong')
        }
    }

}

