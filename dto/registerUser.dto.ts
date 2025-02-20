import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class RegisterUserDto{
    @IsEmail()
    public email: string

    @IsNotEmpty()
    @MinLength(8)
    public hashedPassword: string
    
    @IsNotEmpty()
    public firstName : string

    @IsNotEmpty()
    public lastName : string
}