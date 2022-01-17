import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsuariosModule } from '../../../controllers/usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshTokenStrategy } from './jwt.refreshtoken.strategy';
import { JwtService } from '@nestjs/jwt';
import { UsuarioServiceModule } from '../usuarios/usuario-service.module';

@Module({
    imports: [
        UsuarioServiceModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s' },
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshTokenStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule {}
