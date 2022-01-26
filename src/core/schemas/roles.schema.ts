import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type RolesDocument = Role & Document;

@Schema()
export class Role {
    @Prop({
        type: String,
        required: true
    })
    role: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
// Metodo para extraer de  UsuarioSchema el password y la version: __v
RoleSchema.methods.toJSON = function(this: any) {
  const { __v, _id, ...role } = this.toObject();
  role.id = _id;
  return role;
}