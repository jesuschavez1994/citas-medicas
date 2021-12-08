import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsuariosModule } from 'src/controllers/usuarios/usuarios.module';

@Module({
    imports: [
        UsuariosModule,
        PassportModule
    ],
    providers: [
        AuthService,
        LocalStrategy
    ],
})
export class AuthModule {}
