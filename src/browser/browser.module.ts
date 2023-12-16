import { Module } from '@nestjs/common';
import { BrowserService } from './service/browser.service';

@Module({
  imports: [],
  controllers: [],
  providers: [BrowserService],
})
export class BrowserModule {}
