import { Resolver, Args, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import LoginUserInput from './dto/login-user-input';
import LoginResult from './dto/login-result';
import { AuthService } from './auth.service';
import { AuthenticationError } from 'apollo-server-core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserEntity } from '../users/entities/user.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(returns => LoginResult)
  async login(@Args('user') userInput: LoginUserInput): Promise<LoginResult> {
    const result = await this.authService.validateUserByPassword(userInput);
    if (result) {
      return result;
    }

    throw new AuthenticationError('Could not log-in with the provided credentials');
  }

  // There is no username guard here because if the person has the token, they can be any user
  @Query(returns => String)
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Context('req') request: any): Promise<string> {
    const user: UserEntity = request.user;
    if (!user) {
      throw new AuthenticationError('Could not log-in with the provided credentials');
    }
    const result = await this.authService.createJwt(user);
    if (result) {
      return result.token;
    }
    throw new AuthenticationError('Could not log-in with the provided credentials');
  }
}
