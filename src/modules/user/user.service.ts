import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'dto/registerUser.dto';
import User from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo : Repository<User>
    ){}
    
    async findByEmail(email: string){
        return await this.userRepo.findOneBy({email})
    }

    async createUser(registerDto : RegisterUserDto){
        const newUser = await this.userRepo.create(registerDto)
        return this.userRepo.save(newUser)    
    }

    async getAllUser(){
        return await this.userRepo.find()
    }
}
