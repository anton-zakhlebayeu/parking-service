import { ApiProperty } from '@nestjs/swagger';

export class UserDtoLoginResponse {
  @ApiProperty()
  access_token: string;
}
