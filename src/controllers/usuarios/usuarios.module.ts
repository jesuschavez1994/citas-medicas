import { Module  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosController } from './usuarios.controller';
import { Usuario, UsuarioSchema } from '../../core/schemas/usuario.schema';
import { UsuariosService } from '../../core/services/usuarios/usuarios.service';
import { UserAlreadyExistsContraint } from '../../helper/verificacion-correo';
import { AuthModule } from '../../core/services/auth/auth.module';
import { UsuarioServiceModule } from 'src/core/services/usuarios/usuario-service.module';
import { MailServiceModule } from '../../core/services/mail/mail-service.module';

@Module({
  imports: [
    MongooseModule
    .forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    UsuarioServiceModule,
    AuthModule,
    MailServiceModule
  ],
  controllers: [UsuariosController],
  providers: [
    UserAlreadyExistsContraint,
  ],
  exports: []
})
export class UsuariosModule{}
