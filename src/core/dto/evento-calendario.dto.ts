import { Type } from 'class-transformer';
import {  
    IsString, 
    IsNotEmpty, 
    IsDate,
    IsOptional
} from 'class-validator';

export class crearEventoDTO{
    @IsNotEmpty({message: 'El titulo es obligatorio'})
    @IsString({ message: 'El titulo del evento debe de ser una cadena de texto' })
    readonly titulo: string;
    @IsNotEmpty({message: 'Las descripcion es obligatoria'})
    @IsString({ message: 'La descripcion del evento debe de ser una cadena de texto' })
    readonly descripcion: string;
    @IsNotEmpty({message: 'La fecha de inicio es obligatorio'})
    @IsDate()
    @Type(() => Date)
    readonly fechaInicio: Date;
    @IsNotEmpty({message: 'La fecha final es obligatorio'})
    @IsDate()
    @Type(() => Date)
    readonly fechaFinal: Date;
    usuario: string;
}

export class actualizarEventoDTO{
    @IsOptional()
    @IsString({ message: 'El titulo del evento debe de ser una cadena de texto' })
    readonly titulo: string;
    @IsOptional()
    @IsString({ message: 'La descripcion del evento debe de ser una cadena de texto' })
    readonly descripcion: string;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly fechaInicio: Date;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly fechaFinal: Date;
}