import { Controller, Get, Post, Delete, Res, HttpStatus, Body, Put, Query, Req, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Usuario, UsuarioDocument } from 'src/core/schemas/usuario.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from 'src/core/services/mail/mail.service';
import { join } from 'path';
import { ActualizarUsuarioDTO, BorrarUsuarioDTO, CrearUsuarioDTO } from '../../core/dto/usuario.dto';
import { UsuariosService } from '../../core/services/usuarios/usuarios.service';
import { JwtAuthGuard } from '../../core/services/auth/jwt-auth.guard';
import { PaginacionDTO } from '../../core/dto/paginacion.dto';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { AuthService } from 'src/core/services/auth/auth.service';
import { paginaActual, totalPaginas } from 'src/helper/paginacion';

@Controller('api/users')
export class UsuariosController {

    constructor(
    @InjectModel(Usuario.name) private readonly usuario: Model<UsuarioDocument>,
    private readonly _usuarioService: UsuariosService,
    private _authService: AuthService,
    private _mailService:  MailService
    ) {}

    @Get()
    async obtenerUsuarios(@Res() res: Response, @MongoQuery() query: MongoQueryModel, @Req() req: any, ) {
        try {
            const { id: uid } = req;
            const [total, users]  = await this._usuarioService.obtenerUsuarios( uid, query );
            console.log(total);
            return res.status(HttpStatus.OK).json({ 
                users, 
                totalUsuarios: total,
                totalPaginas: await totalPaginas(total, query),
                paginaActual: await paginaActual(query), 
            });
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @Get('/:id')
    async obtenerUsuario(@Res() res: Response, @Param('id') id: string){
        try {
            const user = await this._usuarioService.obtenerUsuario(id);
            return res.status(HttpStatus.OK).json({ user });
        }
        catch (error) {
             return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
    
    @Post()
    async crearUsuario(@Res() res: Response, @Body() body: CrearUsuarioDTO ) {
        try {
            // Numeros de vueltas por defecto 10
            const salt = await bcrypt.genSalt();
            // Encriptar en una sola via
            body.password = await bcrypt.hash(body.password, salt);
            // Extraemos el password para no mostrarlo como respuesta
            const user = await this._usuarioService.crearNuevoUsuario(body);
            // Obtenemos las credenciales
            const credenciales = await this._authService.login(user);
            // Extraemos las credenciales del usuario
            const { token, refreshToken } = credenciales;
            // resgresamos el user creado
            return res.status(HttpStatus.OK).json({
                message: 'Usuario creado',
                user,
                token, 
                refreshToken
            })
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async actualizarusuario(@Res() res: Response, @Body() body: ActualizarUsuarioDTO, @Param('id') id: string ){
        try {
            // Si el password existe lo actualizamos
            if( body.password ){
                const salt = await bcrypt.genSalt();
                body.password = await bcrypt.hash(body.password, salt);
            }
            // Hacemos la peticion al servicio
            const usuaioAcualizado = await this._usuarioService.actualizarUsuario(id, body);
            // resgresamos el user actualizado
            const { status } = usuaioAcualizado
            // Verificamos que el user que quiere actualizar se encuentra en status true
            return ( status ) 
            ? res.status(HttpStatus.OK).json({message: 'Usuario Actualizado', usuaioAcualizado})
            : res.status(HttpStatus.BAD_REQUEST).json({ message: 'Usuario no encontrado' })  
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async borrarUsuario(@Res() res: Response, @Body() body: BorrarUsuarioDTO,  @Param('id') id: string) {
        try {
            // Esperamos que el servicio responda
            const usarioBorrado = await this._usuarioService.borrarUsuario(id);
            //extraemos el status del usuario
            const { status } = usarioBorrado
            // si el usuario es status true borramos el usuario
            return ( status ) 
            ? res.status(HttpStatus.OK).json({message: 'Usuario Borrado', usarioBorrado}) 
            : res.status(HttpStatus.BAD_REQUEST).json({ message: 'Usuario no encontrado' })
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}
