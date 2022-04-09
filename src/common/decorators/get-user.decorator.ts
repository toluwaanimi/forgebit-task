import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    try {
      const account = GqlExecutionContext.create(ctx).getContext().req.user;
      if (!account) {
        throw new UnauthorizedException('Unauthorized request');
      }
      return account;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized request');
    }
  },
);
