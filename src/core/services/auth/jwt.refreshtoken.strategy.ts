import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException, Body} from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {
    constructor(private _usuariosService :UsuariosService) {
        super({
        jwtFromRequest: ExtractJwt.fromBodyField('token'),
        ignoreExpiration: true,
        secretOrKey: jwtConstants.secret,
        passReqToCallback:true
        });
    }
 
    async validate(req) {
        const { token } = req.body;
        let payload = await this.parseJwt(token);
        const { username: correo } = payload;
        var usuario =  await this._usuariosService.obtenerUsuario(correo);
        const { __v, _id, password, ...resul } =  usuario.toObject();
        if(!resul){
            throw new UnauthorizedException();
        }
        if(req.body.refreshToken != (await resul).refreshtoken){
            throw new UnauthorizedException();
        }
        if( new Date() > new Date((await resul).refreshtokenexpires)){
        throw new UnauthorizedException();
        }
       return usuario;
    }

    async parseJwt (token: string) {
       let base64Url = token.split('.')[1]; // token you get
       let base64 = base64Url.replace('-', '+').replace('_', '/');
       let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
       return decodedData;
    };
}