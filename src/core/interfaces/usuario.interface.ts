import { Document } from "mongoose";

export interface UsuarioInterface extends Document{
    google: boolean;
    estado: boolean;
    correo: string;
    nombre: string;
    _id: string;
    password: string;
    __v: number;
    refreshtoken?: string
    refreshtokenexpires?: Date
}