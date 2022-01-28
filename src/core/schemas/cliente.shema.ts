import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Usuario } from './usuario.schema';
export type ClientDocument = Client & Document;

@Schema()
export class Client {

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
  })
  avatar:string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  })
  user: string;

}

export const Clientchema = SchemaFactory.createForClass(Client);
Clientchema.methods.toJSON = function(this: any) {
  const { __v, _id, ...result } = this.toObject();
  result.id = _id;
  return result;
}


