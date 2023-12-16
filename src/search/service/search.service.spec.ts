import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { BrowserService } from '../../browser/service/browser.service';
import { ConfigModule } from '@nestjs/config';
import { SearchRoomsOptionsDto } from '../dto/search-rooms-options-dto';
import { IRoom } from '../interface/IRoom';
import { BadRequestException, Logger } from '@nestjs/common';
import { Page } from 'puppeteer';

describe('SearchService', () => {
  let searchService: SearchService;
  let browserService: BrowserService;

  const mockRoomList: IRoom[] = [
    {
      name: 'mock_name',
      description: 'mock_description',
      image: 'mock_url',
      price: 'mock_price',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [SearchService, BrowserService, Logger],
    }).compile();

    searchService = module.get<SearchService>(SearchService);
    browserService = module.get<BrowserService>(BrowserService);
  });

  it('should be able to return quotation list', async () => {
    jest
      .spyOn(searchService, 'mappingRooms')
      .mockImplementationOnce(async () => {
        return mockRoomList;
      });
    jest.spyOn(browserService, 'getBrowser');

    const mock_payload: SearchRoomsOptionsDto = {
      checkin: '2023-12-12',
      checkout: '2023-12-16',
    };

    const result = await searchService.search(mock_payload);

    expect(result.length).toBe(1);
    expect(searchService.mappingRooms).toHaveBeenCalledTimes(1);
  }, 20000);

  it('should be able to mapping room list', async () => {
    jest
      .spyOn(searchService, 'mappingRooms')
      .mockImplementationOnce(async () => {
        return mockRoomList;
      });

    const result = await searchService.mappingRooms(
      'mock_page' as unknown as Page,
    );

    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('price');
    expect(result[0]).toHaveProperty('image');
    expect(result[0]).toHaveProperty('description');
  }, 20000);

  it('should be able return an error if there are no options in the room list', async () => {
    jest
      .spyOn(searchService, 'mappingRooms')
      .mockImplementationOnce(async () => {
        return [];
      });
    jest.spyOn(browserService, 'getBrowser');

    const mock_payload: SearchRoomsOptionsDto = {
      checkin: '2023-12-12',
      checkout: '2023-12-13',
    };

    const result = searchService.search(mock_payload);

    await expect(result).rejects.toBeInstanceOf(BadRequestException);
  }, 20000);
});
