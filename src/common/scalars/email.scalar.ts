import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode, GraphQLError } from 'graphql';

@Scalar('Email')
export class EmailScalar implements CustomScalar<string, string> {
  description = 'Email custom scalar type';

  private emailRegex: RegExp;

  constructor() {
    this.emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  }

  parseValue(value: string): string {
    if (typeof value !== 'string') {
      throw new TypeError('Value is not string');
    }

    if (!this.emailRegex.test(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`);
    }

    return value;
  }

  serialize(value: string): string {
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`);
    }

    if (!this.emailRegex.test(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`);
    }

    return value;
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as email addresses but got a: ${ast.kind}`);
    }

    if (!this.emailRegex.test(ast.value)) {
      throw new TypeError(`Value is not a valid email address: ${ast.value}`);
    }

    return ast.value;
  }
}
