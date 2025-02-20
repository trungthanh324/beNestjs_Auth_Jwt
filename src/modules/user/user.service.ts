import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'decorator/currentuser.decorator';
import { RegisterUserDto } from 'dto/registerUser.dto';
import { UpdateUserDto } from 'dto/updateuser.dto';
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

    async findById(id : number){
        return await this.userRepo.findOne({where: {id}})
    }

    async updateUser(updateUser: UpdateUserDto, id: number){
        const currentUser = await this.findById(id)
        if(!currentUser){throw new BadRequestException("invalid user")}

        await this.userRepo.update(currentUser, updateUser)
        return await this.userRepo.save(currentUser)
    }
}