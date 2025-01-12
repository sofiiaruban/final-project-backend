import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from 'src/types/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    //const request = context.switchToHttp().getRequest();
    //console.log('Request object:', request);
    //
    //const user = request.user;
    //console.log('User:', user);

    //if (!user) {
    //  console.log('No user found on request');
    //  return false;
    //}
    const user = {
      role: Role.Admin,
    };

    return requiredRoles.some((role) => user.role === role);
  }
}
