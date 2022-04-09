import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field({ description: 'toluwanimi' })
  username: string;

  @Field({ description: 'Emmanuel' })
  password: string;
}
