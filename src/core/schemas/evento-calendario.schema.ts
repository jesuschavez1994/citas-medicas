import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type EventoCalendarioDocument = EventoCalendario & Document;

@Schema()
export class EventoCalendario {
  @Prop({
    type: String,
    required: true
  })
  titulo: string;

  @Prop({
    type: String,
    required: true,
  })
  descripcion: string;

  @Prop({
    type: Date,
    required: true
  })
  fechaInicio: Date;

  @Prop({
    type: Date,
    required: true
  })
  fechaFinal: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  })
  usuario: string;

}

export const EventoCalendarioSchema = SchemaFactory.createForClass(EventoCalendario);
// Metodo para extraer de  UsuarioSchema el password y la version: __v
EventoCalendarioSchema.methods.toJSON = function(this: any) {
  const { __v, _id, ...evento } = this.toObject();
  evento.id = _id;
  return evento;
}
