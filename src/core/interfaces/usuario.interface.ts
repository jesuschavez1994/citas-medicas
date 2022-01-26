import { Document } from "mongoose";

export interface UsuarioInterface extends Document{
    google: boolean;
    status: boolean;
    email: string;
    name: string;
    password: string;
    refreshtoken?: string
    refreshtokenexpires?: Date
    __v: number;
    _id: string;
    role: string
}

export interface Usuario {
    google: boolean;
    status: boolean;
    email: string;
    name: string;
    password: string;
    refreshtoken?: string
    refreshtokenexpires?: Date
    role: string
}