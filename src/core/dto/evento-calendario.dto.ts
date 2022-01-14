import { Type } from 'class-transformer';
import {  
    IsString, 
    IsNotEmpty, 
    IsDate,
    IsOptional
} from 'class-validator';

export class crearEventoDTO{
    @IsNotEmpty({message: 'El title es obligatorio'})
    @IsString({ message: 'El title del evento debe de ser una cadena de texto' })
    readonly title: string;
    @IsNotEmpty({message: 'Las notes es obligatoria'})
    @IsString({ message: 'La notes del evento debe de ser una cadena de texto' })
    readonly notes: string;
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
    @IsString({ message: 'El title del evento debe de ser una cadena de texto' })
    readonly title: string;
    @IsOptional()
    @IsString({ message: 'La notes del evento debe de ser una cadena de texto' })
    readonly notes: string;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly start: Date;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly end: Date;
}