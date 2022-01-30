import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpecialityDocument = Speciality & Document;

@Schema()
export class  Speciality {
    @Prop({
        type: String,
        required: true
    })
    name: string;

    @Prop({
        type: String,
        required: true
    })
    description: string;
}

export const SpecialitySchema = SchemaFactory.createForClass( Speciality );
// Metodo para extraer de  UsuarioSchema el password y la version: __v
SpecialitySchema.methods.toJSON = function(this: any) {
  const { __v, _id, ...speciality } = this.toObject();
  speciality.id = _id;
  return speciality;
}