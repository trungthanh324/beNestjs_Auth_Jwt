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
        to: 'trunghuy832@gmail.com', // list of receivers
        subject: 'Testing gui email k tu ding', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>hello world</b>', // HTML body content
      })
    
        return "ok"
    }
}
