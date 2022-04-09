import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int } from '@nestjs/graphql';

export class AbstractEntity extends BaseEntity {}
