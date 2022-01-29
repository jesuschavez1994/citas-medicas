import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from '../../core/schemas/usuario.schema';
import { Client, Clientchema } from '../../core/schemas/cliente.shema';
import { ClienteServiceModule } from '../../core/services/cliente/cliente-service.module';
import { UsuarioServiceModule } from 'src/core/services/usuarios/usuario-service.module';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Client.name, schema: Clientchema }]),
        MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
        ClienteServiceModule,
        UsuarioServiceModule
    ]
})
export class ClienteControllerModule {}
