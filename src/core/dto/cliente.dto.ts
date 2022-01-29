import { Type } from 'class-transformer';
import {  
    IsString, 
    IsNotEmpty, 
    IsDate,
    IsOptional,
    IsNumber
} from 'class-validator';

export class ClientDTO{
    @IsOptional()
    @IsString({ message: 'La descripción debe de ser una cadena de texto' })
    readonly description: string;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly birthDate: Date;
    @IsOptional()
    @IsNumber()
    readonly age: number;
    @IsOptional()
    @IsString({ message: 'La direción debe de ser una cadena de texto' })
    readonly address: string;
    @IsOptional()
    @IsString()
    readonly avatar: string;
    @IsOptional()
    @IsString({ message: 'El nombre debe de ser una cadena de texto' })
    readonly nameComplete: string;
}