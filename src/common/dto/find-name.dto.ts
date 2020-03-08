import { Max, Min, MinLength, IsArray, IsMongoId } from 'class-validator';
import { ArgsType, Field, Int, ID } from 'type-graphql';
import { order } from '../types/order.type';

@ArgsType()
export class FindNameDto {
  @Field(type => Int)
  @Min(0)
  skip: number = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take: number = 50;

  @Field(type => [ID], { nullable: true })
  @IsArray()
  @IsMongoId({ each: true })
  ids?: string[];

  @Field({ nullable: true })
  @MinLength(3)
  name?: string;

  @Field(type => String, { nullable: true })
  order?: order = 'DESC';

  @Field({ nullable: true })
  fieldSort?: string = 'updatedAt';
}
