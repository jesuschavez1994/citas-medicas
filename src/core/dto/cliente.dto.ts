import { Type } from 'class-transformer';
import {  
    IsString, 
    IsNotEmpty, 
    IsDate,
    IsOptional,
    IsNumber,
    IsEmail
} from 'class-validator';
import { IsUserAlreadyExist } from 'src/helper/verificacion-correo';

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


export class CreateNewClientDTO{
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    @IsString({ message: 'El nombre debe de ser una cadena de texto' })
    readonly name: string;
    @IsNotEmpty({message: 'El correo es obligatorio'})
    @IsEmail({ message: 'El correo debe de ser una dirección de correo válida' })
    @IsUserAlreadyExist({message: 'Este correo $value ya ha sido registrado'})
    readonly email: string;
    @IsOptional()
    password: string;
}