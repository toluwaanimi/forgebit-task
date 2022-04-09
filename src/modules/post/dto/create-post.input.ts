import { InputType, Field } from '@nestjs/graphql';
import { CategoryEnum } from '../../../common/enum/category,enum';
import { IsEnum } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field({ description: 'You got hired by ForgeBit' })
  title: string;

  @Field({
    description: 'Here is your hiring contract from ForgeBit',
  })
  content: string;
  @IsEnum(CategoryEnum, { message: 'Can either be news, sport or games' })
  category: CategoryEnum;
}
