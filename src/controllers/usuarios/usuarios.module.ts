import { Module  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosController } from './usuarios.controller';
import { Usuario, UsuarioSchema } from '../../core/schemas/usuario.schema';
import { UsuariosService } from '../../core/services/usuarios/usuarios.service';
import { UserAlreadyExistsContraint } from '../../helper/verificacion-correo';
import { AuthModule } from 'src/core/services/auth/auth.module';
import { UsuarioServiceModule } from 'src/core/services/usuarios/usuario-service.module';

@Module({
  imports: [
    MongooseModule
    .forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    UsuarioServiceModule,
    AuthModule
  ],
  controllers: [UsuariosController],
  providers: [
    UserAlreadyExistsContraint,
  ],
  exports: []
})
export class UsuariosModule{}
