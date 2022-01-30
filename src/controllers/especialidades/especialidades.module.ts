import { Module } from '@nestjs/common';
import { EspecialidadesServiceModule } from 'src/core/services/especialidades/especialidades-service.module';

@Module({
    imports: [EspecialidadesServiceModule]
})
export class EspecialidadesModule {}
