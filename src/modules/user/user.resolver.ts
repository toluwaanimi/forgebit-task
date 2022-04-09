import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { AccountResponse } from './dto/account.response';

@Resolver(() => AccountResponse)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => AccountResponse)
  async login(@Args('loginInput') loginInput: LoginUserInput) {
    console.log(loginInput);
    return await this.userService.login(loginInput);
  }

  @Mutation(() => AccountResponse)
  async register(@Args('registerInput') registerInput: RegisterUserInput) {
    return await this.userService.register(registerInput);
  }
}
