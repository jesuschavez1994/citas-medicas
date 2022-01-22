import {  
    IsPositive,
    IsNumber,
    IsOptional
} from 'class-validator';

export class PaginacionDTO {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    desde: number;
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    limite: number;
}

export class PaginadoDTO {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    limite: number;
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    page: number;
}