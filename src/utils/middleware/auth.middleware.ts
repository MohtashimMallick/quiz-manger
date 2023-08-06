import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiTokenException } from '../exceptions/api-token.exception';

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['api-token'] !== 'my-token')
      //   throw new BadRequestException('Token does not match');

      //   throw new HttpException('My response', HttpStatus.UNAUTHORIZED);
      throw new ApiTokenException();

    next();
  }
}
