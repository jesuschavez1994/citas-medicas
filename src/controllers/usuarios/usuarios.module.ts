import { Module  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosController } from './usuarios.controller';
import { Usuario, UsuarioSchema } from '../../core/schemas/usuario.schema';
import { UsuariosService } from '../../core/services/usuarios/usuarios.service';
import { UserAlreadyExistsContraint } from '../../helper/verificacion-correo';
import { AuthModule } from '../../core/services/auth/auth.module';
import { UsuarioServiceModule } from 'src/core/services/usuarios/usuario-service.module';
import { MailServiceModule } from '../../core/services/mail/mail-service.module';
import { RoleAlreadyExistsContraint } from 'src/helper/verificacion-role';
import { Role, RoleSchema } from 'src/core/schemas/roles.schema';

@Module({
  imports: [
    MongooseModule
    .forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    MongooseModule
    .forFeature([{ name: Role.name, schema: RoleSchema }]),
    UsuarioServiceModule,
    AuthModule,
    MailServiceModule
  ],
  controllers: [UsuariosController],
  providers: [
    UserAlreadyExistsContraint,
    RoleAlreadyExistsContraint
  ],
  exports: []
})
export class UsuariosModule{}
