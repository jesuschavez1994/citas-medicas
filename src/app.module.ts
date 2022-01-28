import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './controllers/usuarios/usuarios.module';
import { AuthModule } from './core/services/auth/auth.module';
import { LoginController } from './controllers/auth/login/login.controller';
import { ConfigModule } from '@nestjs/config';
import { EventosCalendarioModule } from './controllers/eventos-calendario/eventos-calendario.module';
import { UsuarioServiceModule } from './core/services/usuarios/usuario-service.module';
import { MailService } from './core/services/mail/mail.service';
import { MailServiceModule } from './core/services/mail/mail-service.module';
import { ClienteController } from './controllers/cliente/cliente.controller';
import { ClienteService } from './core/services/cliente/cliente.service';
import { ClienteControllerModule } from './controllers/cliente/cliente-controller.module';
import { ClienteServiceModule } from './core/services/cliente/cliente-service.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsuariosModule,
    AuthModule,
    MailServiceModule,
    UsuarioServiceModule,
    EventosCalendarioModule,
    MailServiceModule,
    ClienteControllerModule,
    ClienteServiceModule
  ],
  controllers: [AppController, LoginController, ClienteController],
  providers: [AppService, MailService],
})
export class AppModule {}
