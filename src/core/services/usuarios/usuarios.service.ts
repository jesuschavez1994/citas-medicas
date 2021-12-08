import { Dependencies, Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrearUsuarioDTO } from 'src/core/dto/usuario.dto';
import { Usuario, UsuarioDocument } from 'src/core/schemas/usuario.schema';

@Injectable()
@Dependencies(LazyModuleLoader)
export class UsuariosService {
    
    constructor(@InjectModel(Usuario.name) private usuario: Model<UsuarioDocument> ) {}

    async obtenerUsuarios(desde?: number, limite?: number): Promise<UsuarioDocument[]>{
        return await this.usuario.find({ estado: true })
        .skip(desde)
        .limit(limite);
    }

    async crearNuevoUsuario(crearUsuarioDTO: CrearUsuarioDTO): Promise<UsuarioDocument>{
        const nuevoUsuario = new this.usuario(crearUsuarioDTO);
        return await nuevoUsuario.save();
    }

    async actualizarUsuario(idUsuario: string, crearUsuarioDTO: CrearUsuarioDTO): Promise<UsuarioDocument>{
        const usarioActualizado = await this.usuario.findByIdAndUpdate(idUsuario, crearUsuarioDTO, {new: true});
        return usarioActualizado;
    }

    async borrarUsuario(idUsuario: string): Promise<UsuarioDocument>{
        return await this.usuario.findByIdAndUpdate(idUsuario, { estado: false });
    }
    

}
