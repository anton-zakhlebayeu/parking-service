import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class UserDtoLogin {
  @ApiProperty()
  @MinLength(4, { message: 'Minimal length of username number is 4' })
  username: string;

  @ApiProperty()
  @MinLength(8, { message: 'Minimal length of password number is 8' })
  password: string;
}
