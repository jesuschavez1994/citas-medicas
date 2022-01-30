import { Type } from 'class-transformer';
import {  
    IsString, 
} from 'class-validator';

export class ImagesDTO{
    @IsString()
    readonly title: string;
}