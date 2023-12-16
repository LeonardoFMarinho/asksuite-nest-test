import { Logger, Module } from '@nestjs/common';
import { SearchService } from './service/search.service';
import { SearchController } from './controller/search.controller';
import { BrowserService } from '../browser/service/browser.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, BrowserService, Logger],
})
export class SearchModule {}
