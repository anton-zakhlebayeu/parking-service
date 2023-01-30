import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { InMemoryUserRepository, IUserRepository } from './users.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: IUserRepository,
      useClass: InMemoryUserRepository,
    },
    UsersService,
  ],
  exports: [IUserRepository, UsersService],
})
export class UsersModule {}
