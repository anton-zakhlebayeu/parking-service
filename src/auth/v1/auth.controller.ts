import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDtoRegister } from './dto/userRegister.dto';
import { UserDto } from './dto/user.dto';
import { UserDtoLogin } from './dto/userLogin.dto';
import { UserDtoLoginResponse } from './dto/userLoginResponse.dto';
import {UsersService} from "../../users/users.service";

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserDto,
  })
  @Post('/register')
  async register(@Body() userDtoRegister: UserDtoRegister): Promise<UserDto> {
    return await this.authService.register(userDtoRegister);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDtoLoginResponse,
  })
  @Post('/login')
  async login(
    @Body() userDtoLogin: UserDtoLogin,
  ): Promise<UserDtoLoginResponse> {
    const user = await this.usersService.findUser(userDtoLogin.username)
    return this.authService.login(user);
  }
}
