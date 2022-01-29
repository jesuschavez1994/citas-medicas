import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { ClientDTO } from 'src/core/dto/cliente.dto';
import {Client, ClientDocument} from '../../schemas/cliente.shema';

@Injectable()
export class ClienteService {

    constructor(@InjectModel(Client.name) private client: Model<ClientDocument> ) {}

    async Client(idUser: string,  body: ClientDTO){ 
        return  (await this.client.create({...body, user: idUser})).populate('user', 'name');
    }

    async updatePhotoProfile(id: string,file: Express.Multer.File): Promise<any> {
        const fileB64 = file.buffer.toString('base64');
        const currentUser = await this.client.findById(id);
        currentUser.avatar = fileB64;
        return await currentUser.save();
    }

    async GetClient(id: string, query?: MongoQueryModel): Promise<any>{
        if(query){
            return await await this.client.findById( id ).populate(query.populate);
        }else{
            return await await this.client.findById( id );
        }
    }

    async updateClient(id: string , body: ClientDTO, query?: MongoQueryModel){
        if(query){
            return await this.client
            .findByIdAndUpdate(id, body, {new: true})
            .populate(query.populate)
            .exec();
        }else{
            return await this.client
            .findByIdAndUpdate(id, body, {new: true})
            .exec();
        }
    }


}
