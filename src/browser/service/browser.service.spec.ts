/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { BrowserService } from './browser.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import puppeteer, { Browser } from 'puppeteer';

describe('BrowserService', () => {
  let browserService: BrowserService;
  let configService: ConfigService;
  let browser;
  const mockCheckin = '10-12-2023';
  const mockCheckout = '15-12-2023';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [BrowserService, ConfigService],
    }).compile();

    browserService = module.get<BrowserService>(BrowserService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be able to create a URL with dates', async () => {
    const URL = browserService.buildURL(mockCheckin, mockCheckout);

    expect(URL).toBeDefined();
    expect(URL).toContain(mockCheckin);
    expect(URL).toContain(mockCheckout);
  });

  it('should be able to return browser and page', async () => {
    jest.spyOn(puppeteer, 'launch');
    jest.spyOn(browserService, 'getBrowserInfo');
    const result = await browserService.getBrowser(
      'mock_checkin',
      'mockCheckout',
    );
    expect(browserService.getBrowserInfo).toHaveBeenCalledTimes(1);
    expect(puppeteer.launch).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('browser');
    expect(result).toHaveProperty('page');
  }, 25000);

  // it('should be able to return browser and page', async () => {
  //   jest
  //     .spyOn(browserService, 'buildURL')
  //     .mockImplementationOnce(() => 'mockURL');

  //   // const page = jest.fn(browser.newPage());
  //   const result = await browserService.getBrowserInfo(
  //     'mock_url' as unknown as Browser,
  //     mockCheckin,
  //     mockCheckout,
  //   );
  //   expect(browserService.getBrowserInfo).toHaveBeenCalled();
  //   expect(puppeteer.launch).toHaveBeenCalled();
  //   expect(result).toHaveProperty('browser');
  //   expect(result).toHaveProperty('page');
  // }, 20000);
});
