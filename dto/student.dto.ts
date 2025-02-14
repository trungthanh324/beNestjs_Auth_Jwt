import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class StudentDto {
        // @IsNotEmpty()
        // public studentId : string

        @MinLength(10)
        @IsNotEmpty()
        public fullname : string

        @IsDateString()
        @IsNotEmpty()
        public dob : string

        @IsEmail()
        @IsNotEmpty()
        public email : string
 
     
        @IsNotEmpty()
        public phone_number : string

        @IsDateString()
        public enroll_at : string

        @IsNotEmpty()
        public gender : string

        @IsNotEmpty()
        @IsString()
        public identification : string
    
}