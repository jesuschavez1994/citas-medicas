import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { exec } from 'child_process';
import { Model } from 'mongoose';
import { crearEventoDTO } from 'src/core/dto/evento-calendario.dto';
import { EventoCalendarioInterface } from 'src/core/interfaces/evento-calendario.interface';
import { EventoCalendario, EventoCalendarioDocument } from 'src/core/schemas/evento-calendario.schema';

@Injectable()
export class EventosCalendarioService {

    constructor(@InjectModel(EventoCalendario.name) private readonly eventoCalendario: Model<EventoCalendarioDocument> ) {}

    async crearEventoCalendario(evento: crearEventoDTO, idUsuario: string){
        // se crea una instancia del  nuevo evento
        const crearEvento = new this.eventoCalendario(evento);
        // se le asigna el id del usuario que lo creo
        crearEvento.usuario = idUsuario;
        // se guarda ese evento en la base de datos
        return await crearEvento.save();
    }

    async obtenerEventos(usuario: string, pagina?: number, limite?: number): Promise<any> {
        return await Promise.all([
            // numero total de eventos en el calendario
            this.eventoCalendario.find({usuario}).count({}),
            // listado de eventos paginados
            this.eventoCalendario.find({usuario})
            .skip((limite * pagina) - limite)
            .limit(limite)
            .populate('usuario', 'nombre correo estado google')
        ]) 
    }

    async actualizarEvento(body, id: string){
        return await this.eventoCalendario.findByIdAndUpdate(id, body, {new: true}).populate('usuario', 'nombre correo estado google');
    }

    async eliminarEvento(id: string){
        // verificamos que existe el evento
        const evento = await this.eventoCalendario.findById(id);
        // si existe, lo eliminamos
        if(evento){
            return await this.eventoCalendario.findByIdAndDelete(id);
        }else{
            return false
        }
    }

}
