import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './controllers/usuarios/usuarios.module';
import { AuthModule } from './core/services/auth/auth.module';
import { LoginController } from './controllers/auth/login/login.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule {}
