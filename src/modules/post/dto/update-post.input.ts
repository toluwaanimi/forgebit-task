import { InputType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CategoryEnum } from '../../../common/enum/category,enum';

@InputType()
export class UpdatePostInput {
  @Field({ description: 'You got hired by ForgeBit', nullable: true })
  title: string;

  @Field({
    description: 'Here is your hiring contract from ForgeBit',
    nullable: true,
  })
  content: string;
  @Field({ description: 'news', nullable: true })
  @IsEnum(CategoryEnum, { message: 'Can either be news, sport or games' })
  category: CategoryEnum;
}
