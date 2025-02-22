import { Controller, Get } from '@nestjs/common';
import { SensitiveWordService } from './sensitive_word.service';

@Controller('sensitive-word')
export class SensitiveWordController {
    constructor(private readonly sensitiveWord: SensitiveWordService){}

    // @Get()
    // removeVietnameseAccents(arr : string[]){
    //     this.sensitiveWord.removeVietnameseAccents(arr)
    // }
}
