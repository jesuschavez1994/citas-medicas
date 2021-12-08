import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './controllers/usuarios/usuarios.module';
import { AuthService } from './core/services/auth/auth.service';
import { AuthModule } from './core/services/auth/auth.module';
import { LoginController } from './controllers/auth/login/login.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://jesus:NocS65l9MZWQSvoL@cluster0.ozezs.mongodb.net/NodeCursoApp'),
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule {}
