import { 
    Body, 
    Controller,  
    Get,
    Patch, 
    HttpStatus, 
    Param, 
    Post, 
    Put,  
    Res, 
    UseGuards, 
    UseInterceptors,
    UploadedFile 
} from '@nestjs/common';
import { MedicDTO } from 'src/core/dto/medico.dto';
import { JwtAuthGuard } from 'src/core/services/auth/jwt-auth.guard';
import { MedicoService } from 'src/core/services/medico/medico.service';
import { Response } from 'express';
import { UsuariosService } from 'src/core/services/usuarios/usuarios.service';
import { EspecialidadesService } from 'src/core/services/especialidades/especialidades.service';
import { SpecialityModel } from 'src/core/interfaces/specialitys.interface';
import { ValidateMongoId } from 'src/core/pipes/validacion-mongo-id.pipe';
@Controller('api/medic')
export class MedicoController {
    constructor(
        private readonly _medicSrvice: MedicoService, 
        private readonly _usuarioService: UsuariosService,
        private readonly _specialitys: EspecialidadesService){}

    @UseGuards(JwtAuthGuard)
    @Post('/:id')
    async createMedic(
    @Res() res: Response, 
    @Param('id', ValidateMongoId) iduser: string, 
    @Body() body: MedicDTO){
        let status:boolean;
        
        try{
            const user = await this._usuarioService.obtenerUsuario(iduser);
            if(user){
                status = user.status
            }else{
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'El usuario no existe'
                })  
            }
            if(status){
                // let specialitysDB = new SpecialityModel();
                // let specialitysBody =  new SpecialityModel();
                // let specialitys = [];
                
                // await this._specialitys.getSpecialitys().then( resp => {
                //     resp.forEach( elements => {
                //         specialitysDB =  new SpecialityModel(elements);
                //         body.speciality.forEach( elements =>{
                //             specialitysBody = new SpecialityModel(elements);
                //             if(specialitysDB._id == specialitysBody._id){
                                
                //             }else{

                //             }
                //         });
                //     })
                // })
                const medic = await this._medicSrvice.createMedic(iduser, body);
                return res.status(HttpStatus.OK).json({
                    medic
                });
            }
        }catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message }); 
        }
    }


}
