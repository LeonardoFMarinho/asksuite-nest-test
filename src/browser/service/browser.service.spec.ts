import { Test, TestingModule } from '@nestjs/testing';
import { BrowserService } from './browser.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer';

describe('BrowserService', () => {
  let browserService: BrowserService;
  let configService: ConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [BrowserService, ConfigService],
    }).compile();

    browserService = module.get<BrowserService>(BrowserService);
    configService = module.get<ConfigService>(ConfigService);
  });
  beforeEach(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  it('Method buildURL should be able to create a URL with dates', async () => {
    const mockCheckin = '10-12-2023';
    const mockCheckout = '15-12-2023';
    const URL = browserService.buildURL(mockCheckin, mockCheckout);

    expect(URL).toBeDefined();
    expect(URL).toContain(mockCheckin);
    expect(URL).toContain(mockCheckout);
  });

  it('should be able to return browser and page', async () => {
    jest.spyOn(puppeteer, 'launch');
    jest.spyOn(browserService, 'getBrowserInfo');

    await browserService.getBrowser('mock_checkin', 'mockCheckout');

    expect(browserService.getBrowserInfo).toHaveBeenCalled();
    // await expect(browser).toHaveBeenCalled();
  }, 10);
});
