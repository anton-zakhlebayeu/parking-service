import { ApiProperty } from '@nestjs/swagger';

export class SlotInfoDto {
  @ApiProperty()
  slotNumber: number;

  @ApiProperty()
  isFree: boolean;

  @ApiProperty()
  plateNumber?: string;
}
