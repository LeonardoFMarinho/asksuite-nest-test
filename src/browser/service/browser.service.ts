import { Injectable, Logger } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BrowserService {
  private readonly logger = new Logger(BrowserService.name);

  constructor(private readonly configService: ConfigService) {}
  async getBrowser(checkin: string, checkout: string) {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await this.getBrowserInfo(browser, checkin, checkout);
    return { browser, page };
  }

  async getBrowserInfo(
    browser: Browser,
    checkin: string,
    checkout: string,
  ): Promise<Page> {
    const page = await browser.newPage();

    const URL = this.buildURL(checkin, checkout);
    await page.goto(URL, { waitUntil: 'networkidle2' });
    return page;
  }

  buildURL(checkin: string, checkout: string) {
    const URL = this.configService
      .get('BASE_URL')
      .replace('payload_checkin', checkin)
      .replace('payload_checkout', checkout);
    this.logger.verbose(`The URL was created successfully ${URL}`);
    return URL;
  }
}
