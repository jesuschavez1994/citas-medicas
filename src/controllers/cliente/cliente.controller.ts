import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { ClientDTO } from 'src/core/dto/cliente.dto';
import { JwtAuthGuard } from '../../core/services/auth/jwt-auth.guard';
import { ClienteService } from '../../core/services/cliente/cliente.service';

@Controller('api/client')
export class ClienteController {

    constructor(private _clientService: ClienteService){}

    @UseGuards(JwtAuthGuard)
    @Post('/:id')
    async Cliente(@Res() res: Response, @Req() req: any, @Param('id') idUser: string,  @MongoQuery() query: MongoQueryModel){
        try{
            console.log(query);
            const client = await this._clientService.Client(idUser, query);
            return res.status(HttpStatus.OK).json({
                client
            })
        }catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message }); 
        }
    }

}
