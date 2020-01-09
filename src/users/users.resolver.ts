import { NotFoundException } from '@nestjs/common';
import { Query, Mutation, Args, Resolver } from '@nestjs/graphql';
import { UserEntity as User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(returns => [User])
  users(@Args() queryArgs: FindUsersDto): Promise<User[]> {
    return this.usersService.findAllUsers(queryArgs);
  }

  @Mutation(returns => User)
  async createUser(@Args('userInput') userInput: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userInput);
  }
}
