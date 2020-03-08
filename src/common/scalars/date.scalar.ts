import { Validator } from 'class-validator';
import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('Date', type => Date)
export class DateScalar implements CustomScalar<number | string, Date> {
  description = 'Date custom scalar type';

  private validator = new Validator();

  parseValue(value: number | string): Date {
    return new Date(value);
  }

  serialize(value: Date): number {
    return value.getTime();
  }

  parseLiteral(ast: any): Date | null {
    if ((ast.kind === Kind.INT || ast.kind === Kind.STRING) && this.validator.isISO8601(ast.value)) {
      return new Date(ast.value);
    }
    throw new Error('Date cannot represent an invalid ISO-8601 Date string');
  }
}
