import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('UsersResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Query Users', done => {
    const query = {
      query: `{
        users {
          items {
            id
            name
            email
          }
          total
        }
      }`,
    };

    request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .end((error, response) => {
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
          expect.objectContaining({
            users: {
              items: [],
              total: 0,
            },
          }),
        );
        done();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
