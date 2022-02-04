import { Type } from 'class-transformer';
import {  
    IsString, 
} from 'class-validator';

export class RefreshTokenDTO{
    @IsString()
    readonly refreshToken: string;
    @IsString()
    readonly token: string;
}