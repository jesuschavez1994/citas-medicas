import {  Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import * as randomToken from 'rand-token'; // npm install rand-token --save

@Injectable()
export class AuthService {

    constructor(private readonly _usuariosService: UsuariosService, private jwtService: JwtService) {}

    //✔️  test unitario //
    async validarUsuario(username: string, password: string): Promise<any> {
        // Verificamos si el usuario existe, a traves del correo
        const user = await this._usuariosService.obtenerUsuario(username);
        if(!user) {
            return false;
        }
        // verificar la contraseña
        const validarPassword = bcrypt.compareSync( password, user.password );
        // validamos si existe el usuario y el password es correcto
        if(user && validarPassword && user.estado) {
            // retornamos el usuario
            const { password, ...result} = user;
            return result;
        }
        return null;
    }

    //✔️  test unitario //
    async generateRefreshToken(userId):  Promise<string>{
        // Generando el token de actualización.
        var refreshToken = randomToken.generate(32); 
        //Definición del tiempo de vencimiento del token de actualización.
        var expirydate =new Date();
        expirydate.setDate(expirydate.getDate() + 6);
        //Invocando el método de la base de datos en el archivo UsuariosService para 
        // actualizar estos token de actualización y el tiempo de vencimiento en la base de datos.
        await this._usuariosService.guardarTokenRefresh(userId, refreshToken, expirydate); 
        return refreshToken
    }

    //✔️  test unitario //
    async login(user: any) {
        //console.log( user  );
        let result;
        // extraemos los datos del usuario
        if(user._doc) {
            result = user._doc;
        }else{ result = user; }
        // sacamos de result los siguientes valores
        const { __v, _id, password, ...usuario } =  result;
        // renombramos el id
        usuario.id = _id;
        // extraemos el correo y id de usuario
       const {correo, id } = usuario;
       // construimos el payload
        const payload = { username: correo, sub: id };
        // generamos el token con la informacion del usuario
        return {
            token: this.jwtService.sign(payload),
            refreshToken: await this.generateRefreshToken(id)
        };
    }
}
