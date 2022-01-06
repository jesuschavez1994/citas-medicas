import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import {UsuariosService} from '../usuarios/usuarios.service';
import { CollaboratorMock } from '../test/mock/schema.mock';
import { Model } from 'mongoose';
import { UsuarioInterface } from 'src/core/interfaces/usuario.interface';
import { BadRequestException, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { createMock } from '@golevelup/ts-jest';
import { CanActivate } from '@nestjs/common';
const jwt = require('jsonwebtoken');

const user = { userId: '61cb3641dad84d8884bef840', username: 'test@gmail.com' }
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Implc3VzMUBnYW1pbC5jb20iLCJzdWIiOiI2MWNiMzY0MWRhZDg0ZDg4ODRiZWY4NDAiLCJpYXQiOjE2NDEzMDgyMTUsImV4cCI6MTY0MTMxMTgxNX0.o8B8-1Vqtprsa9oKzArEybSOo3CkjFazUEoUvMs4WoQ'

describe('JwtAuthGuard', () => {
    let guard: JwtAuthGuard
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            JwtAuthGuard,
            
          ],
          imports: [
            PassportModule,
            JwtModule.register({
                secret: process.env.SECRET_JWT,
                signOptions: { expiresIn: '3600s' },
            }),
          ],
        }).compile();
        guard = module.get<JwtAuthGuard>(JwtAuthGuard);
      });
     
      it('Debe de retornar un usuario', async() => {
        const fakeClaim = {
          username: 'test@gmail.com',
          sub: '61cb3641dad84d8884bef840',
          iat: 1641312495,
          exp: 1641316095
        };
        const context = {
          getClass: jest.fn(),
          getHandler: jest.fn(),
          switchToHttp: jest.fn(() => ({
            getRequest: jest.fn().mockReturnValue({
              headers: {
                authorization: token,
              },
            }),
            getResponse: jest.fn(),
          })),
        } as any;
        jest.spyOn(jwt, 'verify').mockReturnValue(() => fakeClaim);
        const result = await guard.handleRequest(null, user, undefined, context as ExecutionContext);
        expect(result).toEqual(user);
      });
      
      // it('Debe de retornar un error', async() => {
      //   const context = {
      //     getClass: jest.fn(),
      //     getHandler: jest.fn(),
      //     switchToHttp: jest.fn(() => ({
      //       getRequest: jest.fn().mockReturnValue({
      //         headers: {
      //           authorization: token,
      //         },
      //       }),
      //       getResponse: jest.fn(),
      //     })),
      //   } as any;
      //   const result = await guard.handleRequest(null, false, undefined, context as ExecutionContext);
      //   expect(result).rejects.toThrow(new UnauthorizedException('Token no válido'));
      // })
})