import { ApiProperty } from '@nestjs/swagger';

export class SearchRoomsOptionsDto {
  @ApiProperty({ type: String })
  checkin: string;

  @ApiProperty({ type: String })
  checkout: string;
}
