import {   
    IsNotEmpty,  
    IsMongoId,
} from 'class-validator';

export class IsMongoIdTDO{
    @IsNotEmpty()
    @IsMongoId({ message: 'El id no es valido' })
    readonly id?: string
}