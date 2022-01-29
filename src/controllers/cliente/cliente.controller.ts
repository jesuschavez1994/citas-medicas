import { 
    Body, 
    Controller, 
    Delete, 
    Get,
    Patch, 
    HttpStatus, 
    Param, Post, 
    Put, 
    Query, 
    Req, 
    Res, 
    UseGuards, 
    UseInterceptors,
    UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { JwtAuthGuard } from '../../core/services/auth/jwt-auth.guard';
import { ClienteService } from '../../core/services/cliente/cliente.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuariosService } from 'src/core/services/usuarios/usuarios.service';
import { ClientDTO } from 'src/core/dto/cliente.dto';

@Controller('api/clients')
export class ClienteController {

    constructor(private readonly _clientService: ClienteService, private readonly _usuarioService: UsuariosService){}

    @UseGuards(JwtAuthGuard)
    @Post('/:id')
    async Cliente(
        @Res() res: Response, 
        @Param('id') idUser: string, 
        @Body() body: ClientDTO){
        try{
            const client = await this._clientService.Client(idUser, body);
            if(!client){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'El usuario no existe'
                })
            }else if(client){
                const{ user: _id } = client;
                const VerifyUser = await this._usuarioService.obtenerUsuario(_id)
                const { status } = VerifyUser;
                if( status ){ 
                    return res.status(HttpStatus.OK).json({
                        client
                    })
                }else{
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        message: 'El usuario no existe'
                    }); 
                }
            }
        }catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message }); 
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/photo')
    @UseInterceptors(FileInterceptor('file'))
    async updatePhotoProfile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Res() res: Response){
        try{
            //verificamos que el usuario existe con el id
            const client = await this._clientService.GetClient(id); 
            if(!client){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'El usuario no existe'
                })
            }else if(client){
                const{ user: _id } = client;
                const VerifyUser = await this._usuarioService.obtenerUsuario(_id)
                const { status } = VerifyUser;
                if( status ){
                    const { avatar } = await this._clientService.updatePhotoProfile(id, file);
                    return ( client ) 
                    ? res.status(HttpStatus.OK).json({avatar}) 
                    : res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ha ocurrido un error' })  
                }else{
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        message: 'El usuario no existe'
                    }); 
                }
            }
        }catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getClient(@Param('id') id: string, @Res() res: Response, @MongoQuery() query: MongoQueryModel){
        try{
            const client = await this._clientService.GetClient(id, query);
            if(!client){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'El usuario no existe'
                })
            }else if(client){
                if(query.populate){
                    const{ user } = client;
                    const { _id } = user;
                    const VerifyUser = await this._usuarioService.obtenerUsuario(_id);
                    const { status } = VerifyUser;
                    if( status ){
                        return (client)
                        ? res.status(HttpStatus.OK).json({client}) 
                        : res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ha ocurrido un error' })  
                    }else{
                        return res.status(HttpStatus.BAD_REQUEST).json({
                            message: 'El usuario no existe'
                        });
                    }
                }else{
                    const{ user: _id } = client;
                    const VerifyUser = await this._usuarioService.obtenerUsuario(_id)
                    const { status } = VerifyUser;
                    if( status ){
                        return (client)
                        ? res.status(HttpStatus.OK).json({client}) 
                        : res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ha ocurrido un error' })  
                    }else{
                        return res.status(HttpStatus.BAD_REQUEST).json({
                            message: 'El usuario no existe'
                        });
                    }
                }
            }
        }catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async updateClient(
        @Param('id') id: string, 
        @Res() res: Response, 
        @MongoQuery() query: MongoQueryModel,
        @Body() body: ClientDTO){
        try{
            const client = await this._clientService.GetClient(id, query);
            if(!client){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'El usuario no existe'
                })
            }else if(client){
                const clientUpdate = await this._clientService.updateClient(id, body, query);
                if(query.populate){
                    const{ user } = client;
                    const { _id } = user;
                    const VerifyUser = await this._usuarioService.obtenerUsuario(_id);
                    const { status } = VerifyUser;
                    if( status ){
                        return (clientUpdate)
                        ? res.status(HttpStatus.OK).json({clientUpdate}) 
                        : res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ha ocurrido un error' })  
                    }else{
                        return res.status(HttpStatus.BAD_REQUEST).json({
                            message: 'El usuario no existe'
                        });
                    }
                }else{
                    const{ user: _id } = client;
                    const VerifyUser = await this._usuarioService.obtenerUsuario(_id)
                    const { status } = VerifyUser;
                    if( status ){
                        return (clientUpdate)
                        ? res.status(HttpStatus.OK).json({clientUpdate}) 
                        : res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ha ocurrido un error' })
                    }else{
                        return res.status(HttpStatus.BAD_REQUEST).json({
                            message: 'El usuario no existe'
                        });
                    }
                }
            }
        }catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}
