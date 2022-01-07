import { Module  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosController } from './usuarios.controller';
import { Usuario, UsuarioSchema } from 'src/core/schemas/usuario.schema';
import { UserAlreadyExistsContraint } from 'src/helper/verificacion-correo';
import { UsuarioServiceModule } from 'src/core/services/usuarios/usuario-service.module';
import { AuthModule } from 'src/core/services/auth/auth.module';

@Module({
  imports: [
    MongooseModule
    .forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    UsuarioServiceModule,
    AuthModule
  ],
  controllers: [UsuariosController],
  providers: [
    UserAlreadyExistsContraint
  ],
  exports: []
})
export class UsuariosModule{}
