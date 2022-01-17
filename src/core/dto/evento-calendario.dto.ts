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
    readonly title: string;
    @IsNotEmpty({message: 'Las descripcion es obligatoria'})
    @IsString({ message: 'La descripcion del evento debe de ser una cadena de texto' })
    readonly description: string;
    @IsNotEmpty({message: 'La fecha de inicio es obligatorio'})
    @IsDate()
    @Type(() => Date)
    readonly start: Date;
    @IsNotEmpty({message: 'La fecha final es obligatorio'})
    @IsDate()
    @Type(() => Date)
    readonly end: Date;
}

export class actualizarEventoDTO{
    @IsOptional()
    @IsString({ message: 'El titulo del evento debe de ser una cadena de texto' })
    readonly title: string;
    @IsOptional()
    @IsString({ message: 'La descripcion del evento debe de ser una cadena de texto' })
    readonly description: string;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly start: Date;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly end: Date;
}