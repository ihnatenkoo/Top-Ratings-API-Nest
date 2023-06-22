import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!req.user) {
      return null;
    }

    if (data) {
      return req.user[data];
    }

    return req.user;
  },
);
