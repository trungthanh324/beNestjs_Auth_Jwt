import { Module } from '@nestjs/common';
import { SensitiveWordController } from './sensitive_word.controller';
import { SensitiveWordService } from './sensitive_word.service';

@Module({
  controllers: [SensitiveWordController],
  providers: [SensitiveWordService]
})
export class SensitiveWordModule {}
