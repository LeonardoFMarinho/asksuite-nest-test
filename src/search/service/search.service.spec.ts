import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { BrowserService } from 'src/browser/service/browser.service';
import { ConfigModule } from '@nestjs/config';

describe('SearchService', () => {
  let searchService: SearchService;
  let browserService: BrowserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [SearchService, BrowserService],
    }).compile();

    searchService = module.get<SearchService>(SearchService);
    browserService = module.get<BrowserService>(BrowserService);
  });

  it('should be defined', () => {
    expect(searchService).toBeDefined();
  });
});
