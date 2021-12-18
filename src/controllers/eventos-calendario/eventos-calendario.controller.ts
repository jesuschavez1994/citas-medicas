import { Body, Controller, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { crearEventoDTO } from 'src/core/dto/evento-calendario.dto';
import { JwtAuthGuard } from 'src/core/services/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/core/services/auth/local-auth.guard';
import { EventosCalendarioService } from 'src/core/services/eventos-calendario/eventos-calendario.service';

@Controller('api/eventos-calendario')
export class EventosCalendarioController {

    constructor(private readonly _eventoCalendarioService: EventosCalendarioService) {}

    @UseGuards(JwtAuthGuard)
    @UseGuards(LocalAuthGuard)
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

}
