import { Type } from 'class-transformer';
import {  
    IsString, 
    IsNotEmpty, 
    IsDate,
    IsOptional,
    IsNumber,
    ArrayNotEmpty
} from 'class-validator';

export class MedicDTO{
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    @IsString({ message: 'El nombre debe de ser una cadena de texto' })
    readonly name: string;
    @IsOptional()
    @IsString({ message: 'La descripción debe de ser una cadena de texto' })
    readonly description: string;
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    readonly birthDate: Date;
    @IsNotEmpty()
    @IsNumber()
    readonly age: number;
    @IsNotEmpty()
    @IsString({ message: 'La direción debe de ser una cadena de texto' })
    readonly address: string;
    @IsOptional()
    @IsString()
    readonly avatar: string;
    @IsOptional()
    @IsString()
    readonly backgroud: string;
    @IsOptional()
    speciality: any;

}