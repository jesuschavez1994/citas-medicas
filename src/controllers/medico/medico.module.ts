import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, Clientchema } from 'src/core/schemas/cliente.shema';
import { EspecialidadesServiceModule } from 'src/core/services/especialidades/especialidades-service.module';
import { MailServiceModule } from 'src/core/services/mail/mail-service.module';
import { MedicoServiceModule } from 'src/core/services/medico/medico-service.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Client.name, schema: Clientchema }]),
        MedicoServiceModule,
        UsuariosModule,
        EspecialidadesServiceModule,
        MailServiceModule
    ]
})
export class MedicoModule {}
