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
        path: 'user',
        select: 'name email status google',
    }
     //✔️  test unitario//
    async crearEventoCalendario(body:any, idUsuario: string){
        const evento= await this.eventoCalendario.create({...body, user: idUsuario});;
        return await evento.populate('user','name');
    }

    async obtenerEventos(uid: string, @MongoQuery() query: MongoQueryModel): Promise<any> {
        const events=await this.eventoCalendario.find({user:uid}).populate('user','name')
        return  events;
    }

    //✔️  test unitario//
    async actualizarEvento(id: string ,body:any, @MongoQuery() query: MongoQueryModel){

        const event= await this.eventoCalendario.findById(id)

        return await this.eventoCalendario
        .findByIdAndUpdate(event.id, body, {new: true})
        .populate('user','name')
        .exec();
    }

     //✔️  test unitario//
    async eliminarEvento(id: string){
        // verificamos que existe el evento
        const event = await this.eventoCalendario.findById(id);
        // si existe, lo eliminamos
        if(event){
            return await this.eventoCalendario.findByIdAndDelete(id);
        }else{
            return false
        }
    }

}
