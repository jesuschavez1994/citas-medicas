import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { parseJwt } from 'src/helper/parseJwt';
import { ROLES_KEY } from '../decoradores/role.decorator';
import { Role } from '../enum/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate( context: ExecutionContext ): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request  = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const payload =  parseJwt(token);
    const { role } = payload;
    const hasRole =  requiredRoles.some( n => { 
      if( role === n ){
        return true
      }else{
        false
      }
    });
    return hasRole;
  }
}
