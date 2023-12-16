import { Body, Controller, Post } from '@nestjs/common';
import { SearchRoomsOptionsDto } from '../dto/search-rooms-options-dto';
import { SearchService } from '../service/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  async search(@Body() searchRoomsDto: SearchRoomsOptionsDto) {
    return this.searchService.search(searchRoomsDto);
  }
}
