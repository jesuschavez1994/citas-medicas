import { Injectable, Res } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly _usuariosService: UsuariosService) {}

    async validarUsuario(correo: string, password: string): Promise<any> {
        // Verificamos si el usuario existe, a traves del correo
        const usuario = await this._usuariosService.obtenerUsuario(correo);
        // verificar la contraseña
        const validarPassword = bcrypt.compareSync( password, usuario.password );
        // validamos si existe el usuario y el password es correcto
        if(usuario && validarPassword) {
            const { password, ...result} = usuario;
            return usuario;
        }
        return null;
    }
}
