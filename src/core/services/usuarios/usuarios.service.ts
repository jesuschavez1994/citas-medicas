import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActualizarUsuarioDTO, CrearUsuarioDTO } from '../../../core/dto/usuario.dto';
import { UsuarioInterface } from '../../../core/interfaces/usuario.interface';
import { Usuario } from '../../../core/schemas/usuario.schema';
import { PaginacionDTO } from '../../../core/dto/paginacion.dto';
import { MongoQueryModel } from 'nest-mongo-query-parser';

@Injectable()
export class UsuariosService {

    constructor(@InjectModel(Usuario.name) private user: Model<UsuarioInterface> ) {}
    //✔️  test unitario //
    async obtenerUsuarios( uid: string, query: MongoQueryModel ): Promise<any>{
        return await Promise.all([
            // numero total de eventos en el calendario
            this.user
            .find({uid})
            .count({})
            .exec(),
            // listado de eventos paginados
            this.user
            .find({uid})
            .limit(query.limit)
            .skip(query.skip)
            .populate(query.populate)
            .exec()
        ]) 
        return await this.user
        .find({ status: true })
        .limit(query.limit)
        .skip(query.skip)
        .sort(query.sort)
        .select(query.select)
        .exec();
    }

    async obtenerUsuario(id: string): Promise<any>{
        return await this.user.findById( id );
    }

    async obtenerUsuarioPorCorreo(email: string): Promise<any>{
        return await this.user.findOne( {email} );
    }

    //✔️  test unitario//
    async crearNuevoUsuario(crearUsuarioDTO: CrearUsuarioDTO): Promise<UsuarioInterface>{
        return await this.user.create(crearUsuarioDTO);
    }

    //✔️  test unitario//
    async actualizarUsuario(idUsuario: string, actualizarUsuarioDTO: ActualizarUsuarioDTO): Promise<UsuarioInterface>{
        const usarioActualizado = await this.user.findByIdAndUpdate(idUsuario, actualizarUsuarioDTO, {new: true});
        return usarioActualizado;
    }

    //✔️  test unitario//
    async borrarUsuario(idUsuario: string): Promise<UsuarioInterface>{
        return await this.user.findByIdAndUpdate(idUsuario, { status: false }, {new: true});
    }

      //✔️  test unitario//
    async guardarTokenRefresh(idUsuario: string, refreshtoken: string, refreshtokenexpires: Date): Promise<UsuarioInterface>{
        return await this.user.findByIdAndUpdate(idUsuario, { refreshtoken: refreshtoken, refreshtokenexpires } , {new: true});
    }


}
