import { Field, ID, ObjectType } from 'type-graphql';
import { EmailScalar as Email } from '../../common/scalars/email.scalar';
import { Column, Entity, ObjectID, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('User')
@ObjectType('User')
export class UserEntity {
  @Field(type => ID)
  @ObjectIdColumn()
  readonly id: ObjectID;

  @Field()
  @Column()
  name: string;

  @Field(type => Email)
  @Column()
  email: string;

  @Field(type => String)
  @Column()
  password: string;

  @Field(type => [String])
  // @Column()
  permissions: string[];

  @Field({ nullable: true })
  @Column()
  telephone?: string;

  @Field({ nullable: true })
  @Column()
  birthDate?: Date;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @Column()
  active: boolean;

  // for some reason, not working
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
