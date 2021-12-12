import { Controller, Request, Post, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from 'src/core/services/auth/auth.service';
import { LocalAuthGuard } from 'src/core/services/auth/local-auth.guard';
import { UsuariosService } from 'src/core/services/usuarios/usuarios.service';
import { verificacionGoogle } from 'src/helper/verificacion-google';

@Controller()
export class LoginController {
    constructor(
        private _authService: AuthService, 
        private readonly _usuariosService :UsuariosService
    ) {}
   @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req, @Res() res: Response) {
        return  res.status(HttpStatus.OK).json(
            await this._authService.login(req.user),
        )
    }

    @UseGuards(AuthGuard('jwt-refreshtoken'))
    @Post('auth/refreshtoken')
    async refreshToken(@Request() req){
        return await this._authService.login(req.user);
    }

    @Post('auth/google')
    async googleLogin(@Request() req, @Res() res: Response) {
        
        const { id_token } = req.body;

        try{
            const {nombre, avatar, correo} = await verificacionGoogle(id_token);
            const usuario = await this._usuariosService.obtenerUsuario(correo);
            if(!usuario){
                const data = { nombre, avatar, correo, password: ':p', google: true, estado: true
                }
                const usuario = await this._usuariosService.crearNuevoUsuario(data);
                return res.status(HttpStatus.OK).json({
                    usuario,
                    token: await this._authService.login(usuario)
                })
            }
            if(usuario){
                return res.status(HttpStatus.OK).json({
                    usuario,
                    token: await this._authService.login(usuario)
                })
            }
            if(!usuario.estado){
                return res.status(HttpStatus.FORBIDDEN).json({
                    ok: false,
                    mensaje: 'Usuario no habilitado'
                })
            }
            return res.status(HttpStatus.OK).json({id_token})
        }catch(e){
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: e.message
            })
        }
    }
}
