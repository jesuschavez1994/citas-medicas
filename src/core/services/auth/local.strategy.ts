import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(correo: string, password: string): Promise<any> {
    const user = await this.authService.validarUsuario(correo, password);
    console.log('usuario', user )
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}