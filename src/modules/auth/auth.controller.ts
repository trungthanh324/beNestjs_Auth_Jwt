import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MailerService } from '@nestjs-modules/mailer';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly mailerService: MailerService
    ){}
    @Get('/mail')
    getMail(){
        this.mailerService
      .sendMail({
        to: 'buithanh10112000@gmail.com  ', // list of receivers
        subject: 'Sáng văn chương, chiều văn võ', // Subject line
        
        template : "mail",
        context: {
            username: "Khánh Huyền",
            activationCode: "có mới nới cũ"
        }
      })
    
        return "ok"
    }
}
