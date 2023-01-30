import { Injectable } from '@nestjs/common';
import { UserDto } from '../auth/v1/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/User.entity';

export interface IUserRepository {
  findOne: (username: string) => UserEntity;
  addUser: (username: string, password: string) => Promise<UserDto>;
}

export const IUserRepository = Symbol('IUserRepository');

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private readonly inMemoryDB: Array<UserEntity | null>;

  constructor() {
    this.inMemoryDB = [];
  }

  async addUser(username: string, password: string): Promise<UserDto> {
    this.inMemoryDB.push({
      userId: this.inMemoryDB.length + 1,
      username: username,
      password: await bcrypt.hash(password, 10),
    });

    return {
      userId: this.inMemoryDB[this.inMemoryDB.length - 1].userId,
      username: this.inMemoryDB[this.inMemoryDB.length - 1].username,
    };
  }

  findOne(username: string): UserEntity {
    return this.inMemoryDB.find((user) => user.username === username);
  }
}
