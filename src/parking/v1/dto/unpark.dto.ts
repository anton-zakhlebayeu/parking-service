import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class UnparkDto {
  @ApiProperty()
  @MinLength(4, { message: 'Minimal length of plate number is 4' })
  plateNumber: string;
}
