import { Injectable } from '@nestjs/common';
import { Speciality, SpecialityDocument } from 'src/core/schemas/especialidades.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EspecialidadesService {

    constructor(@InjectModel(Speciality.name) private speciality: Model<SpecialityDocument> ) {}

    async getSpecialitys(){
        return await this.speciality.find();
    }

}
