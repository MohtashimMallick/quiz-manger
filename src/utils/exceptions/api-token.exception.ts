import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiTokenException extends HttpException {
  constructor() {
    super('Valid token is required', HttpStatus.UNAUTHORIZED);
  }
}
