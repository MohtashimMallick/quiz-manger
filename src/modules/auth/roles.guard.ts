import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflactor: Reflector, private userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflactor.get('roles', context.getHandler());
    if (request?.user) {
      const { id } = request.user;
      const user = await this.userService.getUserById(id);
      return roles.includes(user.userRole);
    }
    return false;
  }
}
