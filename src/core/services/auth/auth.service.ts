import {  Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly _usuariosService: UsuariosService,
        private jwtService: JwtService
    ) {}

    async validarUsuario(username: string, password: string): Promise<any> {
        // Verificamos si el usuario existe, a traves del correo
        const user = await this._usuariosService.obtenerUsuario(username);
        // verificar la contraseña
        const validarPassword = bcrypt.compareSync( password, user.password );
        // validamos si existe el usuario y el password es correcto
        if(user && validarPassword) {
            const { password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        // extraemos los datos del usuario
        const result = user._doc;
        // sacamos de result los siguientes valores
        const { __v, _id, password, ...usuario } =  result;
        // renombramos el id
        usuario.id = _id;
        const payload = { username: user.correo, sub: user.id };
        // generamos el token con la informacion del usuario
        return {
            usuario,
            token: this.jwtService.sign(payload),
        };
    }
}
