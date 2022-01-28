import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { MongooseModule } from '@nestjs/mongoose';
import {Client, Clientchema} from '../../schemas/cliente.shema';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Client.name, schema: Clientchema }])
    ],
    providers:[ClienteService],
    exports:[ClienteService]
})
export class ClienteServiceModule {}
