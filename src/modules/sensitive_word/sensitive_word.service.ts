import { Injectable } from '@nestjs/common';
import { sensitive_words } from '../sensitive_word/bad_words';
import removeAccents from 'remove-accents';

@Injectable()
export class SensitiveWordService {
  //   constructor(private readonly bad_words: string[] = sensitive_words){}

  // removeVietnameseAccents(words: string[]): string[] {
  //   return words.map(word => removeAccents(word));
  // }
  

}

