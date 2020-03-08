import { IsOptional, IsMongoId } from 'class-validator';
import { ID, Field, ArgsType } from 'type-graphql';
import { CreateUserDto } from './create-user.dto';

@ArgsType()
export class UpsertUserDto {
  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  id?: string;

  @Field()
  userInput: CreateUserDto;
}
