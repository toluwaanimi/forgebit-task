import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './post.model';
import { AbstractEntity } from './abstract';

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  username: string;

  @Column({})
  @Field({ nullable: true })
  password: string;

  @OneToMany(() => Post, (post) => post.creator)
  @Field(() => [Post], { nullable: true })
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
