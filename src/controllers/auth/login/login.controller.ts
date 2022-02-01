import { Controller, Request, Post, UseGuards, Res, HttpStatus, Get, Body, Render, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RefreshTokenDTO } from 'src/core/dto/auth.dto';
import { parseJwt } from 'src/helper/parseJwt';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LocalAuthGuard } from '../../../core/services/auth/local-auth.guard';
import { UsuariosService } from '../../../core/services/usuarios/usuarios.service';
import { verificacionGoogle } from '../../../helper/verificacion-google';

@Controller('api/auth')
export class LoginController {

    constructor(private _authService: AuthService, private readonly _usuariosService :UsuariosService) {}

    @Post('login')
    async login(@Request() req, @Res() res: Response) {
        try {
            const user = await this._authService.validarUsuario(req.body.email,req.body.password);
            // Obtenemos las credenciales
            const credenciales = await this._authService.login(user);

            return  res.status(HttpStatus.OK).json({
                ...credenciales
            })
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.message,
                message: 'Error al autenticar usuario'
            })  
        }
    }

    @UseGuards(AuthGuard('jwt-refreshtoken'))
    @Post('refreshtoken')
    async refreshToken(@Request() req, @Res() res: Response){

    //const { id: idUser } = req;
    const { token } = req.body;
    // parseamos el token => obtenemos el payload
    let payload = await parseJwt(token);
    // obtenemos el email del usuario
    const { username: email, sub: id } = payload;

    try {
        const user = await this._usuariosService.obtenerUsuario(id);
        // Obtenemos las credenciales
        const credenciales = await this._authService.login(user);
        return  res.status(HttpStatus.OK).json({
            ...credenciales
        })
    }catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
            message: 'Error al autenticar usuario'
        }) 
      }
    }

    @Post('google')
    async googleLogin(@Request() req, @Res() res: Response) {
        // obtenemos el id_token de usuario proporcionada por google
        const { id_token } = req.body;

        try{
            // verificamos el token y desestructuramos el usuario
            const {name, avatar, email} = await verificacionGoogle(id_token);
            // verificamos si el usuario existe en la base de datos con el email
            const user = await this._usuariosService.obtenerUsuario(email);
            // si el usuario no existe, creamos un nuevo usuario
            if(!user){
                // creamos el usuario
                const data = { name, avatar, email, password: ':p', google: true, status: true, role: 'ADMIN_ROLE' };
                // guardamos el usuario
                const user = await this._usuariosService.crearNuevoUsuario(data);
                // creamos el token y retornamos la respuesta
                return res.status(HttpStatus.OK).json({
                    user,
                    token: await this._authService.login(user)
                })
            }
            // si el usuario existe, retornamos el token y el usuario para que se pueda loguear
            if(user){
                return res.status(HttpStatus.OK).json({
                    user,
                    token: await this._authService.login(user)
                })
            }
            // si el usuario {status: false}, retornamos un error
            if(!user.status){
                return res.status(HttpStatus.FORBIDDEN).json({
                    ok: false,
                    message: 'Usuario no habilitado'
                })
            }
            return res.status(HttpStatus.OK).json({id_token})
        }catch(error){
            // si ocurre un error, retornamos un error
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.message,
                message: 'Error al autenticar usuario'
            })
        }
    }

    
    @Get('email-confirmation')
    //@Render('email-confirmation')
    async emailConfirmation(@Query() query: any) {
      const payload = await this._authService.decodeConfirmationToken(query.token);
    const { username: email, sub: id} = payload 
      const result = await this._authService.confirmEmail(id, email);
      console.log(result);
      let success = true;
      if (result == 'Email already confirmed') success = false;
      return { success };
    }
}
