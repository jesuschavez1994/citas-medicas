import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import { jwtConstants } from './constants';
const jwt = require('jsonwebtoken');

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
    
  handleRequest(err, user, info:  Error, context: ExecutionContext) {
    //obtenemos el request
    const request = context.switchToHttp().getRequest<any>();
    // obtenemos el token y quitamos el string Bearer
    const token = request.headers.authorization.split(' ')[1];
    if (info instanceof TokenExpiredError) {
      // do stuff when token is expired
    }
    if (err || !user ) {
      throw err || new UnauthorizedException('Token no válido');
    }else{
      // obtenemos el id del token
      const {sub: id, username: email} = jwt.verify(token,jwtConstants.secret);
      // enviamos el id del usuario al request
      request.id = id;
      request.email = email;
    }
    return user;
  }
}
