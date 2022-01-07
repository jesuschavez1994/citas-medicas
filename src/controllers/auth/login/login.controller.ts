import { Controller, Request, Post, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from 'src/core/services/auth/auth.service';
import { LocalAuthGuard } from 'src/core/services/auth/local-auth.guard';
import { UsuariosService } from 'src/core/services/usuarios/usuarios.service';
import { verificacionGoogle } from 'src/helper/verificacion-google';

@Controller('api/auth')
export class LoginController {

    constructor(private _authService: AuthService, private readonly _usuariosService :UsuariosService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res() res: Response) {
        try {
            console.log(req.user)
            return  res.status(HttpStatus.OK).json(
                await this._authService.login(req.user),
            )
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.message,
                mensaje: 'Error al autenticar usuario'
            })  
        }
    }

    @UseGuards(AuthGuard('jwt-refreshtoken'))
    @Post('refreshtoken')
    async refreshToken(@Request() req, @Res() res: Response){
      try {
        return  res.status(HttpStatus.OK).json(
            await this._authService.login(req.user),
        )
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
            mensaje: 'Error al autenticar usuario'
        }) 
      }
    }

    @Post('google')
    async googleLogin(@Request() req, @Res() res: Response) {
        // obtenemos el id_token de usuario proporcionada por google
        const { id_token } = req.body;

        try{
            // verificamos el token y desestructuramos el usuario
            const {nombre, avatar, correo} = await verificacionGoogle(id_token);
            // verificamos si el usuario existe en la base de datos con el correo
            const usuario = await this._usuariosService.obtenerUsuario(correo);
            // si el usuario no existe, creamos un nuevo usuario
            if(!usuario){
                // creamos el usuario
                const data = { nombre, avatar, correo, password: ':p', google: true, estado: true };
                // guardamos el usuario
                const usuario = await this._usuariosService.crearNuevoUsuario(data);
                // creamos el token y retornamos la respuesta
                return res.status(HttpStatus.OK).json({
                    usuario,
                    token: await this._authService.login(usuario)
                })
            }
            // si el usuario existe, retornamos el token y el usuario para que se pueda loguear
            if(usuario){
                return res.status(HttpStatus.OK).json({
                    usuario,
                    token: await this._authService.login(usuario)
                })
            }
            // si el usuario {estado: false}, retornamos un error
            if(!usuario.estado){
                return res.status(HttpStatus.FORBIDDEN).json({
                    ok: false,
                    mensaje: 'Usuario no habilitado'
                })
            }
            return res.status(HttpStatus.OK).json({id_token})
        }catch(error){
            // si ocurre un error, retornamos un error
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.message,
                mensaje: 'Error al autenticar usuario'
            })
        }
    }
}
