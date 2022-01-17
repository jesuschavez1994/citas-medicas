import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      //passReqToCallback: true,
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validarUsuario(email, password);
    console.log('correo',email)
    if(user === false){
      throw new BadRequestException('Usuario no existe');
    }
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return user;
  }
}



