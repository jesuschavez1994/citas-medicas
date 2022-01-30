import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Medic, MedicDocument } from 'src/core/schemas/medico.shema';
import { Model } from 'mongoose';
import { MedicDTO } from 'src/core/dto/medico.dto';
import { MongoQueryModel } from 'nest-mongo-query-parser';

@Injectable()
export class MedicoService {

    constructor(@InjectModel(Medic.name) private medic: Model<MedicDocument> ) {}

    async createMedic(idUser: string,  body: MedicDTO){ 
        return  (await this.medic.create({...body, user: idUser})).populate('user', 'name');
    }

    async getMedic(id: string, query?: MongoQueryModel): Promise<any>{
        if(query){
            return await await this.medic.findById( id ).populate(query.populate);
        }else{
            return await await this.medic.findById( id );
        }
    }

    async updateMedic(idMedic: string, body: MedicDTO){
        await this.medic.findByIdAndUpdate(idMedic, body, {new: true});
    }


}
