import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountResponse {
  @Field({ description: 'Example field (placeholder)' })
  username: string;

  @Field({ description: 'Example field (placeholder)' })
  token: string;
}
