import { Document } from "mongoose";
import { UsuarioInterface } from "./usuario.interface";

export interface EventoCalendarioInterface extends Document {
  events: EventoInterface[];
}

export interface EventoInterface {
  end: string;
  start: string;
  description: string;
  title: string;
  user: UsuarioInterface;
  id: string;
}
