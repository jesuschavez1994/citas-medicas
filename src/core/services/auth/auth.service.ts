import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {

    constructor(
        private readonly _usuariosService: UsuariosService,
        private jwtService: JwtService
        ) {}

    async validarUsuario(correo: string, password: string): Promise<any> {
        // Verificamos si el usuario existe, a traves del correo
        const usuario = await this._usuariosService.obtenerUsuario(correo);
        // verificar la contraseña
        const validarPassword = bcrypt.compareSync( password, usuario.password );
        // validamos si existe el usuario y el password es correcto
        if(usuario && validarPassword) {
            const { password, ...result} = usuario;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.correo, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
