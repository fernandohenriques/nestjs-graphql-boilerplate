import { IsOptional, Length, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { EmailScalar as Email } from '../../common/scalars/email.scalar';

@InputType('CreateUserInput')
export class CreateUserDto {
  @Field()
  @MinLength(10)
  name: string;

  @Field(type => Email)
  @Length(30, 500)
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  telephone?: string;

  @Field({ nullable: true })
  @IsOptional()
  birthDate?: Date;
}
