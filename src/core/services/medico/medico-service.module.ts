import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Medic, MedicSchema } from 'src/core/schemas/medico.shema';
import { MedicoService } from './medico.service';
@Module({
    imports:[
        MongooseModule.forFeature([{ name: Medic.name, schema: MedicSchema }])
    ],
    providers:[MedicoService],
    exports: [MedicoService]
})
export class MedicoServiceModule {}
