import { Module } from '@nestjs/common';
import { BrowserService } from './service/browser.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [],
  providers: [BrowserService, ConfigService],
})
export class BrowserModule {}
