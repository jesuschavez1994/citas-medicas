import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrearUsuarioDTO } from 'src/core/dto/usuario.dto';
import { UsuarioInterface } from 'src/core/interfaces/usuario.interface';
import { Usuario } from 'src/core/schemas/usuario.schema';

@Injectable()
export class UsuariosService {

    constructor(@InjectModel(Usuario.name) private usuario: Model<UsuarioInterface> ) {}

    async obtenerUsuarios(desde?: number, limite?: number): Promise<UsuarioInterface[]>{
        return await this.usuario.find({ estado: true }).skip(desde).limit(limite);
    }

    async obtenerUsuario(correo: string): Promise<UsuarioInterface>{
        return await this.usuario.findOne({ correo });
    }

    async crearNuevoUsuario(crearUsuarioDTO: CrearUsuarioDTO): Promise<UsuarioInterface>{
        const nuevoUsuario = new this.usuario(crearUsuarioDTO);
        return await nuevoUsuario.save();
    }

    async actualizarUsuario(idUsuario: string, crearUsuarioDTO: CrearUsuarioDTO): Promise<UsuarioInterface>{
        const usarioActualizado = await this.usuario.findByIdAndUpdate(idUsuario, crearUsuarioDTO, {new: true});
        return usarioActualizado;
    }

    async borrarUsuario(idUsuario: string): Promise<UsuarioInterface>{
        return await this.usuario.findByIdAndUpdate(idUsuario, { estado: false });
    }

    async guardarTokenRefresh(idUsuario: string, refreshtoken: string, refreshtokenexpires: Date): Promise<UsuarioInterface>{
        return await this.usuario.findByIdAndUpdate(idUsuario, { refreshtoken: refreshtoken, refreshtokenexpires } , {new: true});
    }


}
