import { Module } from '@nestjs/common';
import { BrowserModule } from './browser/browser.module';
import { SearchModule } from './search/search.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BrowserModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
