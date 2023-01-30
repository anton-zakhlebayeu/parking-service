import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './v1/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserDtoLogin } from './v1/dto/userLogin.dto';
import { UserEntity } from '../users/entities/User.entity';
import { UserDtoRegister } from './v1/dto/userRegister.dto';
import {UserDtoLoginResponse} from "./v1/dto/userLoginResponse.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Pick<UserEntity, 'userId' | 'username'>> {
    const user = await this.usersService.findUser(username);
    const hashedPassword = await bcrypt.hash(pass, 10);
    if (user && user.password === hashedPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: UserDtoRegister): Promise<UserDto> {
    return await this.usersService.registerUser(user.username, user.password);
  }
}
