import { BadRequestException, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from '../../models/user.model';
import * as bcrypt from 'bcryptjs';
import { JwtHelper } from '../../common/helpers/jwt..helper';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { AccountResponse } from './dto/account.response';

@Injectable()
export class UserService {
  async login(payload: LoginUserInput): Promise<AccountResponse> {
    const account: User = await getRepository(User).findOne({
      where: {
        username: payload.username.toLowerCase(),
      },
    });

    if (!account) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!bcrypt.compareSync(payload.password, account.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwtToken: string = await JwtHelper.signToken(account);

    return {
      token: jwtToken,
      username: account.username,
    };
  }

  async register(payload: RegisterUserInput): Promise<AccountResponse> {
    payload.username = payload.username.toLowerCase();
    const account = await getRepository(User).findOne({
      where: {
        username: payload.username,
      },
    });
    if (account) {
      throw new BadRequestException('Account already exist with this username');
    }
    const user: User = await getRepository(User).save({
      username: payload.username,
      password: bcrypt.hashSync(payload.password),
    });
    const jwtToken = JwtHelper.signToken(user);
    return {
      token: jwtToken,
      username: user.username,
    };
  }
}
