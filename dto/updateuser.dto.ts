import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto{
    @IsNotEmpty() 
    @IsEmail()      
    public email: string;

    @IsNotEmpty()
    public firstName: string; 

    @IsNotEmpty()
    public lastName: string;
    
    @IsNotEmpty()
    public hashedPassword: string
}