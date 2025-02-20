import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class LoginDto{
    @IsEmail({},{message: "Email không hợp lệ"})
    public email: string
    
    @IsNotEmpty()
    @MinLength(8)
    public hashedPassword: string

}