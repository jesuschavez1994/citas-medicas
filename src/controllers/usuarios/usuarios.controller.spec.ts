import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from '../../core/services/usuarios/usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuariosModule } from './usuarios.module';

describe('UsuariosController', () => {
  let controller: UsuariosController;

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
          },
        }
        
      ]
    }).overrideProvider(UsuariosService).useValue(mockUsuarioService).compile();

    controller = module.get<UsuariosController>(UsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
