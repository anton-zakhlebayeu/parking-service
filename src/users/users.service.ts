import { Inject, Injectable } from '@nestjs/common';
import { InMemoryUserRepository, IUserRepository } from './users.repository';
import { UserDto } from '../auth/v1/dto/user.dto';
import { UserEntity } from './entities/User.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: InMemoryUserRepository,
  ) {}

  async findUser(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(username);
  }

  async registerUser(username: string, password: string): Promise<UserDto> {
    return this.userRepository.addUser(username, password);
  }
}
