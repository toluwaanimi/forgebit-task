import { InputType, Field } from '@nestjs/graphql';
import { CategoryEnum } from '../../../common/enum/category,enum';
import { IsEnum, IsOptional } from 'class-validator';

@InputType()
export class FilterSearchInput {
  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(CategoryEnum, { message: 'Can either be news, sport or games' })
  category?: CategoryEnum;
}
