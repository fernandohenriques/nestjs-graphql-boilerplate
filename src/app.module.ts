import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DateScalar } from './common/scalars/date.scalar';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      debug: process.env.NODE_ENV === 'development',
    }),
    UsersModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
