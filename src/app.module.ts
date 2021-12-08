import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './controllers/usuarios/usuarios.module';



@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://jesus:NocS65l9MZWQSvoL@cluster0.ozezs.mongodb.net/NodeCursoApp'), UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
