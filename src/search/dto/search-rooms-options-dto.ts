import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class SearchRoomsOptionsDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsDateString({ strict: true })
  checkin: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsDateString({ strict: true })
  checkout: string;
}
