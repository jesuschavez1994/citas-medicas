import {
    ExecutionContext,
    HttpStatus,
    Injectable,
    Res,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import {  JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
  import { Response } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {



    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
      }
    
      handleRequest(err, user, info:  Error, @Res() res: Response) {
        if (info instanceof TokenExpiredError) {
            // do stuff when token is expired
        }
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user ) {
          throw err || new UnauthorizedException();
        }
        return user;
      }
}