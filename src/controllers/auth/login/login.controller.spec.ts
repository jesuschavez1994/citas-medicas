import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosService } from '../../../core/services/usuarios/usuarios.service';
import { LoginController } from './login.controller';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LocalStrategy } from '../../../core/services/auth/local.strategy';
import { JwtStrategy } from '../../../core/services/auth/jwt.strategy';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        UsuariosService, 
        AuthService,  
        LocalStrategy, 
        JwtStrategy,
        {
          provide: getModelToken('Usuario'),
          useValue: {},
        }
      ],
      imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET_JWT,
            signOptions: { expiresIn: '3600s' },
        }),
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
