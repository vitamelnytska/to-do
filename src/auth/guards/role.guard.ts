import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { RoleEnum } from '../../common/models/users/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private tService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'none authorized',
        });
      }

      const user = this.tService.verifyAccessToken(token);

      req.user = user;
      let user1 = '1';
      let user2 = '2';
      console.log(requiredRoles);
      console.log(user.roles);
      requiredRoles.forEach(function (value) {
        user1 = value.toString();
        console.log(value);
      });
      user.roles.forEach(function (value) {
        user2 = value;
        console.log(value);
      });
      if (!(user1 == user2)) {
        throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
      } else return true;
    } catch (e) {
      console.log(e);
    }
  }
}
