import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Usuario } from './usuario.schema';
import { Speciality } from './especialidades.shema';

export type MedicDocument = Medic & Document;

@Schema()
export class Medic {

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: Date,
  })
  birthDate: Date;

  @Prop({
    type: Number,
  })
  age: number;

  @Prop({
    type: String,
  })
  address: String;

  @Prop({
    type: String,
    default: null
  })
  avatar:string;

  @Prop({
    type: String,
    default: null
  })
  backgroud: String;

  @Prop({
    type: mongoose.Schema.Types.Array,
    ref: 'Speciality'
  })
  speciality: Speciality;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  })
  user: Usuario;

}

export const MedicSchema = SchemaFactory.createForClass(Medic);
MedicSchema.methods.toJSON = function(this: any) {
  const { __v, _id, ...result } = this.toObject();
  result.id = _id;
  return result;
}

