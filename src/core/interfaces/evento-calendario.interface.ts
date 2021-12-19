import { Document } from "mongoose";
import { UsuarioInterface } from "./usuario.interface";

export interface EventoCalendarioInterface extends Document {
  eventos: EventoInterface[];
}

export interface EventoInterface {
  fechaFinal: string;
  fechaInicio: string;
  descripcion: string;
  titulo: string;
  usuario: UsuarioInterface;
  id: string;
}
