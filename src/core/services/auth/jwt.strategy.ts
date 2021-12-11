import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //  extrae el token del header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //  acepta un valor booleano, si el valor es verdadero, entonces 'JwtStrategy' 
      //  ignora para verificar el vencimiento del token en la validación, 
      //  si el valor es falso, entonces 'JwtStrategy' verificará la fecha de vencimiento 
      ignoreExpiration: false,  
      // secreto para validar el token
      secretOrKey: jwtConstants.secret, 
    });
  }

  // El método 'Validate ()' se ejecuta para un token válido y devuelve la 
  //información del usuario agregándola al objeto 'Solicitud'.
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}