import { HttpStatus, Res } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from '../../core/services/usuarios/usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuariosModule } from './usuarios.module';
import { Response } from 'express';
import { Model } from 'mongoose';
import { UsuarioInterface } from '../../core/interfaces/usuario.interface';
import { CollaboratorMock } from '../../core/services/test/mock/schema.mock';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;
  let model: Model<UsuarioInterface>;

  const mockUsuarioService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        UsuariosService,
        {
          provide: getModelToken('Usuario'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            json: jest.fn(),
          },
        }
        
      ]
    }).overrideProvider(UsuariosService).useValue(mockUsuarioService).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Debe de obtener un usuario de la DB', async() => {
    const result = jest.spyOn(UsuariosService.prototype as any, 'obtenerUsuario').mockImplementation(() => CollaboratorMock.mockUsuarioResult as any);
    const response = {
      json: (body?: any) => {},
      status: (code: number) => HttpStatus.OK,
    } as any;
    const resp = await controller.obtenerUsuario(response, 'email');
  })
});
