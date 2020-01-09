import { IsOptional, Length, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType('CreateUserInput')
export class CreateUserDto {
  @Field()
  @MinLength(10)
  name: string;

  @Field()
  @Length(30, 500)
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  birthdate?: Date;
}
