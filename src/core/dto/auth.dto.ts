import { Type } from 'class-transformer';
import {  
    IsString, 
} from 'class-validator';

export class refreshToken{
    @IsString()
    readonly refreshToken: string;

}