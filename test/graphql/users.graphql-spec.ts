import * as fs from 'fs';
import * as path from 'path';
import * as faker from 'faker';
import * as EasyGraphQLTester from 'easygraphql-tester';

describe('UsersModule (Queries e Mutations)', () => {
  let tester: any;

  beforeAll(() => {
    const schema: any = fs.readFileSync(
      path.join(__dirname, '../../src', 'schema.gql'),
      'utf8',
    );
    tester = new EasyGraphQLTester(schema);
  });

  it('Should pass if the mutation is valid', done => {
    const name: string = faker.name.findName();
    const email: string = faker.internet.email();

    const mutation: string = `
      mutation createUser($user: CreateUserInput!) {
        createUser(userInput: $user) {
          name
          email
        }
      }
    `;
    tester.test(true, mutation, {
      user: {
        name,
        email,
      },
    });
    done();
  });
});
