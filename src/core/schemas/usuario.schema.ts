import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({
    type: String,
    required: true
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true
  })
  password: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  status: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  google: boolean;

  @Prop({
    type: String,
  })
  refreshtoken:string;

  @Prop({
    type: String,
  })
  refreshtokenexpires: Date;
}


export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
// Metodo para extraer de  UsuarioSchema el password y la version: __v
UsuarioSchema.methods.toJSON = function(this: any) {
  const { __v, _id, password, ...user } = this.toObject();
  user.id = _id;
  return user;
}