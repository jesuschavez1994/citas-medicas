import { Type } from 'class-transformer';
import {  
    IsString, 
    IsNotEmpty, 
    IsDate,
    IsOptional
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
    @IsDate()
    @Type(() => Date)
    readonly age: Date;
    @IsOptional()
    @IsString({ message: 'La direción debe de ser una cadena de texto' })
    readonly address: string;
    @IsOptional()
    @IsString()
    readonly avatar: string;
}