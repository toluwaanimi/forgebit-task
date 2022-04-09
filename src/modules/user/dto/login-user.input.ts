import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field({ description: 'toluwanimi' })
  username: string;

  @Field({ description: 'Emmanuel' })
  password: string;
}
