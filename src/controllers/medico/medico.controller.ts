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
import { CreateNewClientDTO } from 'src/core/dto/cliente.dto';
import { generateP } from 'src/helper/generar-password-aleatorio';
import { CrearUsuarioDTO } from 'src/core/dto/usuario.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/core/services/mail/mail.service';
import { Roles } from 'src/core/decoradores/role.decorator';
import { Role } from 'src/core/enum/role.enum';
import { RoleGuard } from 'src/core/guards/role.guard';


@Controller('api/medic')
export class MedicoController {
    constructor(
        private readonly _medicSrvice: MedicoService, 
        private readonly _usuarioService: UsuariosService,
        private readonly _specialitys: EspecialidadesService,
        private _mailService:  MailService){}

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post('/:id')
    @Roles(Role.Admin)
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
                const medic = await this._medicSrvice.createMedic(iduser, body);
                return res.status(HttpStatus.OK).json({
                    medic
                });
            }
        }catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message }); 
        }
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post('/:id/client')
    @Roles(Role.Admin)
    async createNewClient(
        @Res() res: Response, 
        @Body() body: CrearUsuarioDTO){
        try{
            body.password = await generateP();
            await this._mailService.sendUserCreateForMedic(  body );
            const salt = await bcrypt.genSalt();
            body.password = await bcrypt.hash(body.password, salt);
            const createUser = await this._usuarioService.crearNuevoUsuario( body );
            return ( createUser ) 
            ? res.status(HttpStatus.OK).json({message: 'Usuario creado', createUser})
            : res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ha ocurrido un error' })  
        }catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message }); 
        }
    }


}
