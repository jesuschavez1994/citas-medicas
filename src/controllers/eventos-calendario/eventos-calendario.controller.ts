import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PaginadoDTO } from '../../core/dto/paginacion.dto';
import { actualizarEventoDTO, crearEventoDTO } from '../../core/dto/evento-calendario.dto';
import { JwtAuthGuard } from '../../core/services/auth/jwt-auth.guard';
import { EventosCalendarioService } from '../../core/services/eventos-calendario/eventos-calendario.service';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { paginaActual, totalPaginas } from '../../helper/paginacion';

@Controller('api/eventos')
export class EventosCalendarioController {

    constructor(private readonly _eventoCalendarioService: EventosCalendarioService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async crearEventoCalendario(@Res() res: Response, @Req() req: any, @MongoQuery() query: MongoQueryModel) {
        try {
            const { id: idUsuario } = req;
            const evento = await this._eventoCalendarioService.crearEventoCalendario(query, idUsuario);
            return (evento) 
            ?  res.status(HttpStatus.OK).json({  message: 'Evento creado', evento }) 
            : res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'No se pudo crear el evento' });
            
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async obtenerEventos(
        @Res() res: Response, 
        @Req() req: any, 
        @MongoQuery() query: MongoQueryModel) {
        // obtenemos el id del usuario del req
        const { id: usuario } = req;

        try {
            // obtenemos los eventos creados por el usuario
            const [total, eventos] = await this._eventoCalendarioService.obtenerEventos(usuario, query);
            // retornamos la respuesta de los eventos
            return (eventos.length > 0 ) 
            // si existen eventos los enviamos
            ? res.status(HttpStatus.OK).json({ 
                eventos,
                totalEventos: total,
                totalPaginas: await totalPaginas(total, query),
                paginaActual: await paginaActual(query),
            })
            // si no existen eventos creados, retornamos el siguiente mensaje
            : res.status(HttpStatus.OK).json({ eventos, mensaje: 'No hay eventos creados' });
            
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async actualizarEvento(
        @Res() res: Response, 
        @Param('id') id: string, 
        @MongoQuery() query: MongoQueryModel) {

        try {
            const evento = await this._eventoCalendarioService.actualizarEvento(id, query);
            return (evento) 
            ?  res.status(HttpStatus.OK).json({  message: 'Evento actualizado', evento })
            : res.status(HttpStatus.BAD_REQUEST).json({ error: 'No se pudo actualizar el evento' });
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async eliminarEvento(@Res() res: Response, @Param('id') id: string){
        try {
            // verififcamos que el evento exista
            const eventoEliminado = await this._eventoCalendarioService.eliminarEvento(id);
            return (eventoEliminado)
            ? res.status(HttpStatus.OK).json({ mensaje: 'Evento Eliminado' })
            : res.status(HttpStatus.BAD_REQUEST).json({ mensaje: 'Evento no existe' })
            
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }


}
