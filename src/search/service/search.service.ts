import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SearchRoomsOptionsDto } from '../dto/search-rooms-options-dto';
import { BrowserService } from '../../browser/service/browser.service';
import { Page } from 'puppeteer';
import { roomParams } from '../utils/room-params';
import { IRoom } from '../interface/IRoom';
import { DateUtil } from '../utils/DateUtil/DateUtil';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly browserService: BrowserService) {}

  async search({ checkin, checkout }: SearchRoomsOptionsDto): Promise<IRoom[]> {
    DateUtil.validateDatesPayload({ checkin, checkout });

    const { checkinValidated, checkoutValidated } = DateUtil.formatDate(
      checkin,
      checkout,
    );
    try {
      const { browser, page } = await this.browserService.getBrowser(
        checkinValidated,
        checkoutValidated,
      );
      this.logger.verbose(
        `Start scrapping to list rooms available between ${checkin} and ${checkout}`,
      );
      const result = await this.mappingRooms(page);

      if (result.length == 0) {
        await browser.close();
        throw new BadRequestException(
          'No rooms found between dates, please, try with other dates',
        );
      }

      this.logger.verbose(
        `Number rooms were found between ${checkinValidated} and ${checkoutValidated} is ${result.length} `,
      );

      await browser.close();

      this.logger.log('END search Service');
      return result;
    } catch (error) {
      this.logger.error(`Error message: ${error?.message}`);
      throw error;
    }
  }

  async mappingRooms(page: Page): Promise<IRoom[]> {
    const roomsFound = await page.evaluate(async (parameters) => {
      const roomOptions = [];
      const rooms = document.querySelectorAll(
        '#main-layout > div.q-page-container > main > article > div.room-list > span > div.room-option-wrapper',
      );
      const regex = /https(.*?\.jpg)/;

      for (const room of rooms) {
        const availableRoom = {
          name: room.querySelector(parameters.name)?.textContent,
          description: room.querySelector(parameters.description)?.textContent,
          price: room.querySelector(parameters.price)?.textContent,
          image: room
            ?.querySelector(parameters.image)
            ?.getAttribute('style')
            ?.match(regex)[0],
        };
        roomOptions.push(availableRoom);
      }
      return roomOptions;
    }, roomParams);

    return roomsFound;
  }
}
