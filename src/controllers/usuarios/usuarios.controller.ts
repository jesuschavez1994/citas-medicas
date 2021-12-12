import { Controller, Get, Post, Delete, Res, HttpStatus, Body, Put, Query, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ActualizarUsuarioDTO, BorrarUsuarioDTO, CrearUsuarioDTO } from 'src/core/dto/usuario.dto';
import { UsuariosService } from 'src/core/services/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { Usuario, UsuarioDocument } from 'src/core/schemas/usuario.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/core/services/auth/jwt-auth.guard';


@Controller('usuarios')
export class UsuariosController {

    constructor(
    @InjectModel(Usuario.name) private readonly usuario: Model<UsuarioDocument>,
    private readonly _usuarioService: UsuariosService) {}

    @Get()
    async obtenerUsuarios(@Res() res: Response, @Query('limite') limite: number = 5, @Query('desde') desde: number = 0) {
        try {
            const usuarios = await this._usuarioService
            .obtenerUsuarios( Number(desde), Number(limite) );
            return res.status(HttpStatus.OK).json({ usuarios });
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @Post('usuario')
    async obtenerUsuario(@Res() res: Response, @Body() body: any){
        try {
            const usuario = await this._usuarioService.obtenerUsuario(body.correo);
            return res.status(HttpStatus.OK).json({ usuario });
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
    
    @Post('crear-usuario')
    async crearUsuario(@Res() res: Response, @Body() body: CrearUsuarioDTO ) {
        try {
            // Numeros de vueltas por defecto 10
            const salt = await bcrypt.genSalt();
            // Encriptar en una sola via
            body.password = await bcrypt.hash(body.password, salt);
            // Extraemos el password para no mostrarlo como respuesta
            const usuario = await this._usuarioService.crearNuevoUsuario(body);
            // resgresamos el usuario creado
            return res.status(HttpStatus.OK).json({
                message: 'Usuario creado',
                usuario
            })
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('actualizar-usuario')
    async actualizarusuario(@Res() res: Response, @Body() body: ActualizarUsuarioDTO ){
        try {
            // Si el password existe lo actualizamos
            if( body.password ){
                const salt = await bcrypt.genSalt();
                body.password = await bcrypt.hash(body.password, salt);
            }
            // Hacemos la peticion al servicio
            const usuaioAcualizado = await this._usuarioService.actualizarUsuario(body.id, body);
            // resgresamos el usuario actualizado
            const { estado } = usuaioAcualizado
            // Verificamos que el usuario que quiere actualizar se encuentra en estado true
            return ( estado ) 
            ? res.status(HttpStatus.OK).json({message: 'Usuario Actualizado', usuaioAcualizado})
            : res.status(HttpStatus.BAD_REQUEST).json({ message: 'Usuario no encontrado' })  
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete('borrar-usuario')
    async borrarUsuario(@Res() res: Response, @Body() body: BorrarUsuarioDTO) {
        try {
            // Esperamos que el servicio responda
            const usarioBorrado = await this._usuarioService.borrarUsuario(body.id);
            //extraemos el estado del usuario
            const { estado } = usarioBorrado
            // si el usuario es estado true borramos el usuario
            return ( estado ) 
            ? res.status(HttpStatus.OK).json({message: 'Usuario Borrado', usarioBorrado}) 
            : res.status(HttpStatus.BAD_REQUEST).json({ message: 'Usuario no encontrado' })
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}
