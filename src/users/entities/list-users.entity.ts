import { Field, ObjectType, Int } from 'type-graphql';
import { IListItems } from '../../common/interfaces/list-items.interface';
import { UserEntity as User } from './user.entity';

@ObjectType('ListUsers')
export class ListUsersEntity implements IListItems {
  @Field(type => [User])
  items: User[];

  @Field(type => Int)
  total: number;
}
