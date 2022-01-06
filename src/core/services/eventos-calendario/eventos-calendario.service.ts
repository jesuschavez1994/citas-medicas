import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginadoDTO } from '../../../core/dto/paginacion.dto';
import { crearEventoDTO } from '../../../core/dto/evento-calendario.dto';
import { EventoCalendario, EventoCalendarioDocument } from '../../../core/schemas/evento-calendario.schema';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';

@Injectable()
export class EventosCalendarioService {

    constructor(@InjectModel(EventoCalendario.name) private readonly eventoCalendario: Model<EventoCalendarioDocument> ) {}
    elementosPopulate ={
        path: 'usuario',
        select: 'nombre correo estado google',
    }
     //✔️  test unitario//
    async crearEventoCalendario(evento: crearEventoDTO, idUsuario: string){
        return await this.eventoCalendario.create({...evento, usuario: idUsuario});
    }

    async obtenerEventos(usuario: string, @MongoQuery() query: MongoQueryModel): Promise<any> {
        
        return await Promise.all([
            // numero total de eventos en el calendario
            this.eventoCalendario
            .find({usuario})
            .count({})
            .exec(),
            // listado de eventos paginados
            this.eventoCalendario
            .find({usuario})
            .limit(query.limit)
            .skip(query.skip)
            .populate(query.populate)
            .exec()
        ]) 
    }

    //✔️  test unitario//
    async actualizarEvento(id: string , @MongoQuery() query: MongoQueryModel){
        return await this.eventoCalendario
        .findByIdAndUpdate(id, query.filter, {new: true})
        .populate(query.populate)
        .exec();
    }

     //✔️  test unitario//
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
