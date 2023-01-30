import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  @MinLength(4, { message: 'Minimal length of username number is 4' })
  username: string;
}
