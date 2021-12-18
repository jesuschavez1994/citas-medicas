import { Module  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosController } from './usuarios.controller';
import { Usuario, UsuarioSchema } from 'src/core/schemas/usuario.schema';
import { UsuariosService } from 'src/core/services/usuarios/usuarios.service';
import { UserAlreadyExistsContraint } from 'src/helper/verificacion-correo';

@Module({
  imports: [
    MongooseModule
    .forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    
  ],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    UserAlreadyExistsContraint
  ],
  exports: [UsuariosService]
})
export class UsuariosModule{}
