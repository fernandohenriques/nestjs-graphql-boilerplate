import { ArgsType } from 'type-graphql';
import { FindNameDto } from '../../common/dto/find-name.dto';

@ArgsType()
export class FindUsersDto extends FindNameDto {}
