import { Module } from '@nestjs/common';
import { EventosCalendarioService } from './eventos-calendario.service';

@Module({
    providers: [EventosCalendarioService],
    exports: [EventosCalendarioService]
})
export class EventosCalendarioServiceModule {}
