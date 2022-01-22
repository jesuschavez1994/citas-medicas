import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../services/auth/auth.service';
import { JwtStrategy } from '../../../services/auth/jwt.strategy';
import { LocalStrategy } from '../../../services/auth/local.strategy';
import {UsuariosService} from '../../../services/usuarios/usuarios.service';
import { CollaboratorMock } from '../../mock/schema.mock';
import { Model } from 'mongoose';
import { UsuarioInterface } from 'src/core/interfaces/usuario.interface';
import { BadRequestException } from '@nestjs/common';


const mockUsuario = {
    "email": "prueba9@gamil.com",
    "password": "12345678"
}

describe('LocalStrategy', () => {
  let service: LocalStrategy;
  let model: Model<UsuarioInterface>;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [AuthService,  LocalStrategy, JwtStrategy, UsuariosService,
      {
        provide: getModelToken('Usuario'),
        useValue: {
          findOne: jest.fn().mockResolvedValue(CollaboratorMock.mockUsuarioResult),
        },
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
  
    service = module.get<LocalStrategy>(LocalStrategy);
    model = module.get<Model<UsuarioInterface>>(getModelToken('Usuario'));
  });
  
  it('Debe de ser definido', () => {expect(service).toBeDefined();});

  it('Debe de validar el usuario', async () => {
    const resp = await service.validate(mockUsuario.email, mockUsuario.password);
    expect(resp).toEqual({ _id: '61b7b3888a91471c9d6a6ad9',
    google: false,
    status: true,
    email: 'prueba9@gamil.com',
    name: 'prueba9',
    __v: 0,
    refreshtoken: 'dvwPH5KY39QhNFpOfb8CReQBOKlpx2ez',
    refreshtokenexpires: 'Sun Dec 26 2021 05:23:17 GMT+0800 (hora estándar de China)'});
  });

  it('Si el usuario no existe debe de mostrar mensaje', async() => {
    jest.spyOn(model, 'findOne').mockImplementation(() => {return Promise.resolve(false) as any;});
    await expect(service.validate('xxxxxx', 'xxxxxx')).rejects.toThrow(new BadRequestException('Usuario no existe'));
  })
});