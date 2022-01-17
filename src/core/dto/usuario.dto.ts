import { 
    IsEmail, 
    IsString, 
    IsNotEmpty, 
    Allow, 
    ValidationArguments,
    MinLength,
    IsMongoId,
    IsOptional} from 'class-validator';
import { IsUserAlreadyExist } from '../../helper/verificacion-correo';

export class CrearUsuarioDTO{
    @IsNotEmpty({message: 'El name es obligatorio'})
    @IsString({ message: 'El name de usuario debe de ser una cadena de texto' })
    readonly name: string;
    @IsNotEmpty({message: 'El correo es obligatorio'})
    @IsEmail({ message: 'El correo debe de ser una dirección de correo válida' })
    @IsUserAlreadyExist({message: 'Este correo $value ya ha sido registrado',})
    readonly email: string;
    @IsString()
    @MinLength(8, {message: (args: ValidationArguments) => { return (args.value.length === 1) ? 'Demasiado corta, la longitud mínima es de 1 carácter.' :'Demasiado corta, la longitud mínima es '+ args.constraints[0] +' caracteres';} })
    password?: string;
    @Allow()
    readonly status: boolean;
    @Allow()
    readonly google: boolean;
    @IsOptional()
    @IsMongoId({ message: 'El id no es valido' })
    readonly id?: string;
    @IsOptional()
    readonly avatar?: string;
}

export class ActualizarUsuarioDTO{
    @IsOptional()
    @IsString({ message: 'El name de usuario debe de ser una cadena de texto' })
    readonly name: string;
    @IsOptional()
    @IsEmail({ message: 'El correo debe de ser una dirección de correo válida' })
    @IsUserAlreadyExist({message: 'Este correo $value ya ha sido registrado',})
    readonly email: string;
    @IsString()
    @MinLength(8, {message: (args: ValidationArguments) => { return (args.value.length === 1) ? 'Demasiado corta, la longitud mínima es de 1 carácter.' :'Demasiado corta, la longitud mínima es '+ args.constraints[0] +' caracteres';} })
    password?: string;
    @Allow()
    readonly status: boolean;
    @Allow()
    readonly google: boolean;
    @IsNotEmpty()
    @IsMongoId({ message: 'El id no es valido' })
    readonly id?: string;
    @IsOptional()
    readonly avatar?: string;
}

export class BorrarUsuarioDTO{
    @IsNotEmpty()
    @IsMongoId({ message: 'El id no es valido' })
    readonly id?: string
}
