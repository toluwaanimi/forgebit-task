import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { CategoryEnum } from '../common/enum/category,enum';

@ObjectType()
@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  title: string;

  @Column('text')
  @Field({ nullable: false })
  content: string;

  @Column({ enum: CategoryEnum, type: 'enum', default: CategoryEnum.NEWS })
  @Field({ nullable: false })
  category: CategoryEnum;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
  })
  @JoinTable()
  @Field(() => User, { nullable: true })
  creator: User;

  @CreateDateColumn()
  @Field({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn()
  @Field({ nullable: false })
  updatedAt: Date;
}
