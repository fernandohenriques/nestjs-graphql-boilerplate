import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DateScalar } from './common/scalars/date.scalar';
import { EmailScalar } from './common/scalars/email.scalar';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      debug: process.env.NODE_ENV === 'development',
    }),
    UsersModule,
    ConfigModule,
    AuthModule,
  ],
  providers: [DateScalar, EmailScalar],
})
export class AppModule {}
