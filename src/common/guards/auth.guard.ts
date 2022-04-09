import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from '../../models/user.model';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtHelper } from '../helpers/jwt..helper';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = GqlExecutionContext.create(context).getContext().req;
    const Authorization = request.get('Authorization');

    if (!Authorization) {
      throw new UnauthorizedException('Unauthorized request');
    }
    const token = Authorization.split(' ');
    if (!((token[1] && token[0] === 'Bearer') || token[0] === 'bearer')) {
      throw new UnauthorizedException('Unauthorized request');
    }

    let decrypt;
    try {
      decrypt = JwtHelper.decrypt(token[1]);
    } catch (e) {
      throw new UnauthorizedException('Unauthorized request');
    }

    const user = await getRepository(User).findOne({
      where: {
        id: decrypt.id,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Unauthorized request');
    }

    request.user = user;
    return true;
  }
}
