import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { actualizarEventoDTO, crearEventoDTO } from 'src/core/dto/evento-calendario.dto';
import { EventoCalendarioInterface, EventoInterface } from 'src/core/interfaces/evento-calendario.interface';
import { UsuarioInterface } from 'src/core/interfaces/usuario.interface';
import { JwtAuthGuard } from 'src/core/services/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/core/services/auth/local-auth.guard';
import { EventosCalendarioService } from 'src/core/services/eventos-calendario/eventos-calendario.service';

@Controller('api/eventos-calendario')
export class EventosCalendarioController {

    constructor(private readonly _eventoCalendarioService: EventosCalendarioService) {}

    @UseGuards(JwtAuthGuard)
    @Post('crear')
    async crearEventoCalendario(@Res() res: Response, @Body() body: crearEventoDTO, @Req() req: any) {
        try {
            const { id: idUsuario } = req;
            const evento = await this._eventoCalendarioService.crearEventoCalendario(body, idUsuario);
            return (evento) 
            ?  res.status(HttpStatus.OK).json({  message: 'Evento creado', evento }) 
            : res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'No se pudo crear el evento' });
            
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('obtener-eventos')
    async obtenerEventos(@Res() res: Response, @Req() req: any) {
        // obtenemos el id del usuario del req
        const { id: usuario } = req;
        try {
            // obtenemos los eventos creados por el usuario
            const eventos = await this._eventoCalendarioService.obtenerEventos(usuario);
            // retornamos la respuesta de los eventos
            return (eventos.length > 0 ) 
            // si existen eventos los enviamos
            ? res.status(HttpStatus.OK).json({ eventos })
            // si no existen eventos creados, retornamos el siguiente mensaje
            : res.status(HttpStatus.OK).json({ eventos, mensaje: 'No hay eventos creados' });
            
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('actualizar/:id')
    async actualizarEvento(@Res() res: Response, @Body() body: actualizarEventoDTO, @Req() req: any, @Param('id') id: string) {
        try {
            const evento = await this._eventoCalendarioService.actualizarEvento(body, id);
            if(evento){
                return res.status(HttpStatus.OK).json({ evento, mensaje: 'Evento actualizado' });
            }
        }catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }


}
