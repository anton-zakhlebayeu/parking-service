import { ApiProperty } from '@nestjs/swagger';

export class ParkingInfoDto {
  @ApiProperty()
  slotNumber: number;

  @ApiProperty()
  plateNumber: string;
}
