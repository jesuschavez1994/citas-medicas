import { Document } from "mongoose";
import { UsuarioInterface } from "./usuario.interface";

export interface EventoCalendarioInterface extends Document {
  eventos: EventoInterface[];
}

export interface EventoInterface {
  end: string;
  start: string;
  notes: string;
  titke: string;
  usuario: UsuarioInterface;
  id: string;
}
