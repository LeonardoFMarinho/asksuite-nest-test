import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SearchRoomsOptionsDto } from '../dto/search-rooms-options-dto';
import { SearchService } from '../service/search.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('scrapping')
@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('search')
  @HttpCode(200)
  @ApiBody({ type: SearchRoomsOptionsDto })
  @ApiResponse({ status: 200, description: 'Room list was found' })
  async search(@Body() searchRoomsDto: SearchRoomsOptionsDto) {
    return this.searchService.search(searchRoomsDto);
  }
}
