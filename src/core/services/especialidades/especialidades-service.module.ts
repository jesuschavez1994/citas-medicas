import { Module } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Speciality, SpecialitySchema } from 'src/core/schemas/especialidades.shema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Speciality.name, schema: SpecialitySchema }])],
    providers: [EspecialidadesService],
    exports: [EspecialidadesService]
})
export class EspecialidadesServiceModule {}
