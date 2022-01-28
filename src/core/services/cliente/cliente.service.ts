import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { ClientDTO } from 'src/core/dto/cliente.dto';
import {Client, ClientDocument} from '../../schemas/cliente.shema';

@Injectable()
export class ClienteService {

    constructor(@InjectModel(Client.name) private client: Model<ClientDocument> ) {}

    async Client(idUser: string,  @MongoQuery() query: MongoQueryModel){ 
        console.log(query);
        const data = query.filter;
        return await (await this.client.create({...data, user: idUser})).populate('user', 'name');
    }

}
