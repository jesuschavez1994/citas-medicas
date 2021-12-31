import { Document } from "mongoose";

export interface UsuarioInterface extends Document{
    google: boolean;
    estado: boolean;
    correo: string;
    nombre: string;
    password: string;
    refreshtoken?: string
    refreshtokenexpires?: Date
    __v: number;
    _id: string;
}

export interface Usuario {
    google: boolean;
    estado: boolean;
    correo: string;
    nombre: string;
    password: string;
    refreshtoken?: string
    refreshtokenexpires?: Date
}