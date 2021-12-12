import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException, Body} from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { jwtConstants } from './constants';
import  { parseJwt }  from '../../../helper/parseJwt'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {
    constructor(private _usuariosService :UsuariosService) {
        super({
        jwtFromRequest: ExtractJwt.fromBodyField('token'), // tomamos el token proporcionado por el body
        ignoreExpiration: true,
        secretOrKey: jwtConstants.secret, // secreto
        passReqToCallback:true
        });
    }
 
    async validate(req) {
        // desestructurar el token
        const { token } = req.body;
        // parseamos el token => obtenemos el payload
        let payload = await parseJwt(token);
        // obtenemos el correo del usuario
        const { username: correo } = payload;
        // obtenemos el usuario => si existe
        var usuario =  await this._usuariosService.obtenerUsuario(correo);
        // sacmos del usuario el password, id, __v
        const { __v, _id, password, ...resul } =  usuario.toObject();
        // verificamos si el usuario existe
        if(!resul){
            throw new UnauthorizedException();
        }
        // commparamos si refreshToken del body es distinto al de la base de datos
        if(req.body.refreshToken != (await resul).refreshtoken){
            throw new UnauthorizedException();
        }
        // comparamos las fechas de expiracion
        if( new Date() > new Date((await resul).refreshtokenexpires)){
        throw new UnauthorizedException();
        }
        return usuario;
    }
}