import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from '../service/search.service';
import { AppModule } from '../../app.module';
import { BrowserService } from '../../browser/service/browser.service';
import { SearchRoomsOptionsDto } from '../dto/search-rooms-options-dto';
import { IRoom } from '../interface/IRoom';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let searchController: SearchController;
  let searchService: SearchService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [SearchController],
      providers: [BrowserService, SearchService],
    }).compile();

    searchController = moduleFixture.get<SearchController>(SearchController);
    searchService = moduleFixture.get<SearchService>(SearchService);
    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/search - success - (POST)', async () => {
    const payload: SearchRoomsOptionsDto = {
      checkin: '2023-12-12',
      checkout: '2023-12-15',
    };
    const mockRepsonse: IRoom[] = [
      {
        name: 'mock_name',
        description: 'mock_description',
        image: 'mock_image',
        price: 'mock_price',
      },
    ];
    jest
      .spyOn(searchService, 'search')
      .mockImplementationOnce(async () => mockRepsonse);

    const [result] = await searchController.search(payload);
    expect(result.name).toBeDefined();
  });

  it('/search - fail -(POST)', async () => {
    const fail_payload: SearchRoomsOptionsDto = {
      checkin: '2023-12-aa',
      checkout: '2023-bbb2-15',
    };

    const result = searchController.search(fail_payload);
    await expect(result).rejects.toBeInstanceOf(BadRequestException);
  });
  it('/search - empty payload -(POST)', async () => {
    const fail_payload: SearchRoomsOptionsDto = {
      checkin: undefined,
      checkout: undefined,
    };

    const result = searchController.search(fail_payload);
    await expect(result).rejects.toBeInstanceOf(BadRequestException);
  });
  it('/search - checkin greater than check-out date - (POST)', async () => {
    const fail_payload: SearchRoomsOptionsDto = {
      checkin: '2023-12-16',
      checkout: '2023-12-15',
    };

    const result = searchController.search(fail_payload);
    await expect(result).rejects.toBeInstanceOf(BadRequestException);
  });
});
