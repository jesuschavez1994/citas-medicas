import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActualizarUsuarioDTO, CrearUsuarioDTO } from '../../../core/dto/usuario.dto';
import { UsuarioInterface } from '../../../core/interfaces/usuario.interface';
import { Usuario } from '../../../core/schemas/usuario.schema';
import { PaginacionDTO } from '../../../core/dto/paginacion.dto';

@Injectable()
export class UsuariosService {

    constructor(@InjectModel(Usuario.name) private usuario: Model<UsuarioInterface> ) {}
    //✔️  test unitario //
    async obtenerUsuarios( { desde = 1, limite = 5 }: PaginacionDTO ): Promise<UsuarioInterface[]>{
        return await this.usuario.find({ estado: true }).skip(desde).limit(limite).exec();
    }

    async obtenerUsuario(correo: string): Promise<UsuarioInterface>{
        return await this.usuario.findOne({ correo });
    }

    //✔️  test unitario//
    async crearNuevoUsuario(crearUsuarioDTO: CrearUsuarioDTO): Promise<UsuarioInterface>{
        return await this.usuario.create(crearUsuarioDTO);
    }

    //✔️  test unitario//
    async actualizarUsuario(idUsuario: string, actualizarUsuarioDTO: ActualizarUsuarioDTO): Promise<UsuarioInterface>{
        const usarioActualizado = await this.usuario.findByIdAndUpdate(idUsuario, actualizarUsuarioDTO, {new: true});
        return usarioActualizado;
    }

    //✔️  test unitario//
    async borrarUsuario(idUsuario: string): Promise<UsuarioInterface>{
        return await this.usuario.findByIdAndUpdate(idUsuario, { estado: false }, {new: true});
    }

      //✔️  test unitario//
    async guardarTokenRefresh(idUsuario: string, refreshtoken: string, refreshtokenexpires: Date): Promise<UsuarioInterface>{
        return await this.usuario.findByIdAndUpdate(idUsuario, { refreshtoken: refreshtoken, refreshtokenexpires } , {new: true});
    }


}
