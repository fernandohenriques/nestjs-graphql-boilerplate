import { ID } from 'type-graphql';
import { NotFoundException } from '@nestjs/common';
import { Query, Mutation, Args, Resolver } from '@nestjs/graphql';
import { UserEntity as User } from './entities/user.entity';
import { ListUsersEntity as listUsers } from './entities/list-users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpsertUserDto } from './dto/upsert-user.dto';
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

  @Query(returns => listUsers)
  users(@Args() queryArgs: FindUsersDto): Promise<listUsers> {
    return this.usersService.findUsers(queryArgs);
  }

  @Mutation(returns => User)
  async saveUser(@Args() mutationArgs: UpsertUserDto): Promise<User> {
    const {
      id,
      userInput,
    }: { id?: string; userInput: CreateUserDto } = mutationArgs;
    return this.usersService.upsertUser(id, userInput);
  }

  @Mutation(returns => Boolean)
  deleteLocation(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.usersService.deleteUser(id);
  }
}
