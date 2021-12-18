import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventoCalendario, EventoCalendarioSchema } from 'src/core/schemas/evento-calendario.schema';
import { EventosCalendarioService } from 'src/core/services/eventos-calendario/eventos-calendario.service';
import { EventosCalendarioController } from './eventos-calendario.controller';

@Module({
    imports: [
        MongooseModule
        .forFeature([{ name: EventoCalendario.name, schema: EventoCalendarioSchema }]),
    ],
    controllers: [EventosCalendarioController],
    providers: [EventosCalendarioService],
})
export class EventosCalendarioModule {}
