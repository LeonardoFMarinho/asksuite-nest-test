import { Body, Controller, Post } from '@nestjs/common';
import { SearchRoomsOptionsDto } from '../dto/search-rooms-options-dto';
import { SearchService } from '../service/search.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  @ApiBody({ type: SearchRoomsOptionsDto })
  @ApiResponse({ status: 201, description: 'Room list was found' })
  async search(@Body() searchRoomsDto: SearchRoomsOptionsDto) {
    return this.searchService.search(searchRoomsDto);
  }
}
