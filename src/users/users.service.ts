import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { FindUsersDto } from './dto/find-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUsersEntity } from './entities/list-users.entity';
import { UserRepository } from './repositories/user.repository';
import { ServiceHelper } from '../common/helpers/service.helper';
import { ObjectID } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly serviceHelper: ServiceHelper, private readonly userRepository: UserRepository) {}

  async findUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        _id: ObjectId(id),
        active: true,
      },
    });
  }

  /**
   * Returns a user by their unique email address or undefined
   *
   * @param {string} email address of user, not case sensitive
   * @returns {(Promise<UserDocument | undefined>)}
   * @memberof UsersService
   */
  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email: email.toLowerCase() });
    if (user) {
      return user;
    }
    return undefined;
  }

  /**
   * Returns a user by their unique username or undefined
   *
   * @param {string} username of user, not case sensitive
   * @returns {(Promise<UserDocument | undefined>)}
   * @memberof UsersService
   */
  async findOneByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ name: username.toLowerCase() });
    if (user) {
      return user;
    }
    return undefined;
  }

  async findUsers(params: FindUsersDto): Promise<ListUsersEntity> {
    return await this.serviceHelper.findAllByNameOrIds(params, this.userRepository);
  }

  async upsertUser(id: string | undefined, user: CreateUserDto): Promise<UserEntity> {
    const { email }: { email: string } = user;
    const userExists: UserEntity = await this.userRepository.findOne({
      where: {
        email,
        active: true,
      },
    });

    if (userExists) {
      throw new Error(`E-mail ${email} is already in use.`);
    }

    const newUser: UserEntity = await this.serviceHelper.getUpsertData(id, user, this.userRepository);

    newUser.password = await bcrypt.hash(newUser.password, 10);

    return this.userRepository.save({ ...newUser, active: true });
  }

  async updateUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user: UserEntity = await this.userRepository.findOne(id);
    return Boolean(this.userRepository.save({ ...user, active: false }));
  }

  /**
   * Returns if the user has 'admin' set on the permissions array
   *
   * @param {string[]} permissions permissions property on a User
   * @returns {boolean}
   * @memberof UsersService
   */
  isAdmin(permissions: string[]): boolean {
    return permissions.includes('admin');
  }
}
