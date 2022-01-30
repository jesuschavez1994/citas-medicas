import { 
    Body, 
    Controller,  
    Get,
    Patch, 
    HttpStatus, 
    Param, Post, 
    Put,  
    Res, 
    UseGuards, 
    UseInterceptors,
    UploadedFile } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/services/auth/jwt-auth.guard';
import { EspecialidadesService } from 'src/core/services/especialidades/especialidades.service';
import { Response } from 'express';

@Controller('api/specialitys')
export class EspecialidadesController {

    constructor(private readonly _speciality: EspecialidadesService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getSpecialitys(@Res() res: Response){
        try{
            const specialitys = await this._speciality.getSpecialitys();
            return  res.status(HttpStatus.OK).json({
                specialitys
            }) 
        }catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message }); 
        }
    }


}
