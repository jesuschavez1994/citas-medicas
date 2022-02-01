import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PaginadoDTO } from '../../core/dto/paginacion.dto';
import { actualizarEventoDTO, crearEventoDTO } from '../../core/dto/evento-calendario.dto';
import { JwtAuthGuard } from '../../core/services/auth/jwt-auth.guard';
import { EventosCalendarioService } from '../../core/services/eventos-calendario/eventos-calendario.service';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { paginaActual, totalPaginas } from '../../helper/paginacion';
import { ValidateMongoId } from 'src/core/pipes/validacion-mongo-id.pipe';

@Controller('api/events')
export class EventosCalendarioController {

    constructor(private readonly _eventoCalendarioService: EventosCalendarioService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async crearEventoCalendario(@Res() res: Response, @Req() req: any, @Body() body: crearEventoDTO) {
        try {
            const { id: idUser } = req;
            const event = await this._eventoCalendarioService.crearEventoCalendario(body, idUser);
            return (event) 
            ?  res.status(HttpStatus.OK).json({  message: 'Evento creado', event }) 
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
        // obtenemos el id del user del req
        const { id: uid } = req;

        try {
            // obtenemos los eventos creados por el user
            const [total, events] = await this._eventoCalendarioService.obtenerEventos(uid, query);
            // retornamos la respuesta de los eventos
            return (events.length > 0 ) 
            // si existen eventos los enviamos
            ? res.status(HttpStatus.OK).json({ 
                events,
                totalEventos: total,
                totalPaginas: await totalPaginas(total, query),
                paginaActual: await paginaActual(query),
            })
            // si no existen eventos creados, retornamos el siguiente message
            : res.status(HttpStatus.OK).json({ events, message: 'No hay eventos creados' });
            
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async actualizarEvento(
        @Res() res: Response, 
        @Param('id', ValidateMongoId) id: string, 
        @MongoQuery() query: MongoQueryModel,
        @Body() body: actualizarEventoDTO) {

        try {
            const event = await this._eventoCalendarioService.actualizarEvento(id, query, body);
            return (event) 
            ?  res.status(HttpStatus.OK).json({  message: 'Evento actualizado', event })
            : res.status(HttpStatus.BAD_REQUEST).json({ error: 'No se pudo actualizar el evento' });
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async eliminarEvento(@Res() res: Response, @Param('id', ValidateMongoId) id: string){
        try {
            // verififcamos que el evento exista
            const eventoEliminado = await this._eventoCalendarioService.eliminarEvento(id);
            return (eventoEliminado)
            ? res.status(HttpStatus.OK).json({ message: 'Evento Eliminado' })
            : res.status(HttpStatus.BAD_REQUEST).json({ message: 'Evento no existe' })
            
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }


}
