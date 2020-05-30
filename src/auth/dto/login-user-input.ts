import { IsOptional, Length, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { EmailScalar as Email } from '../../common/scalars/email.scalar';

@InputType('LoginUserInput')
export default class LoginUserInput {
  @Field()
  password: string;

  @Field(type => Email)
  @Length(30, 500)
  email: string;
}
