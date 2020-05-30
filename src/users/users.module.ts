import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from './repositories/user.repository';
import { ServiceHelper } from '../common/helpers/service.helper';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  exports: [UsersService],
  providers: [UsersService, UsersResolver, ServiceHelper],
})
export class UsersModule {}
