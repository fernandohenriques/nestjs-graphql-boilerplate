import { Field, ObjectType, Int } from 'type-graphql';
import { UserEntity as User } from '../../users/entities/user.entity';

@ObjectType('LoginResult')
export default class LoginResult {
  @Field(type => User)
  user: User;

  @Field(type => String)
  token: string;
}
