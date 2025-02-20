import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'dto/registerUser.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
                private readonly userService: UserService
    ) {}

    async login(loginDto : LoginDto){
        try {
            const userEmail = await this.userService.findByEmail(loginDto.email)
            if(!userEmail){
                throw new BadRequestException("email doesnt exist")
            }
            // console.log("mat khau input:", loginDto.hashedPassword);
            // console.log("mat khau DB:", userEmail.hashedPassword);
            const isMatchPassword = await bcrypt.compare(loginDto.hashedPassword, userEmail.hashedPassword);
            // console.log("so sanh 2 mk:", isMatchPassword);
            if(!isMatchPassword){ throw new  UnauthorizedException("Wrong password")}

            //generate accesstoken
            const payload = {
                id: userEmail.id,
                role: userEmail.role,
                firstName: userEmail.firstName,
                lastName: userEmail.lastName ,
                email: userEmail.email
            }
            const accessToken = await this.jwtService.signAsync(payload,
                {secret: process.env.JWT_SECRET})
            return {msg:"Login successfully!", accessToken}
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof UnauthorizedException) {
                throw error;
            }
            throw new Error("Interval server")
        }
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
            role: saveUser.role,
            email: saveUser.email
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

