import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import {UsuariosService} from '../usuarios/usuarios.service';
import {UsuarioInterface, Usuario} from '../../interfaces/usuario.interface';
import { jwtConstants } from './constants';

const mockUsuario = {
  "correo": "prueba9@gamil.com",
  "password": "12345678"
}

const mockResult = {
  _id: '61b7b3888a91471c9d6a6ad9',
  google: false,
  estado: true,
  password: '$2b$10$/cCPqfEO5IF3yb0AQ1Qz5.1QepQOgXgoaXybd7svvV4AIlSQnTogO',
  correo: 'prueba9@gamil.com',
  nombre: 'prueba9',
  __v: 0,
  refreshtoken: 'dvwPH5KY39QhNFpOfb8CReQBOKlpx2ez',
  refreshtokenexpires: 'Sun Dec 26 2021 05:23:17 GMT+0800 (hora estándar de China)'
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,  LocalStrategy, JwtStrategy, UsuariosService,
        {
          provide: getModelToken('Usuario'),
          useValue: {},
      }],
      imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET_JWT,
            signOptions: { expiresIn: '3600s' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Debe de ser definido', () => {
    expect(service).toBeDefined();
  });
});


describe('AuthService', () => {
  let service: AuthService;
  let model: Model<UsuarioInterface>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,  LocalStrategy, JwtStrategy, UsuariosService,
        {
          provide: getModelToken('Usuario'),
          useValue: {
            findOne: jest.fn(),
          },
      }],
      imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET_JWT,
            signOptions: { expiresIn: '3600s' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    model = module.get<Model<UsuarioInterface>>(getModelToken('Usuario'));
  });

  
  it('Validamos que el correo del usuario exista en la Base de Datos',  async () => {
    jest.spyOn(model, 'findOne').mockImplementation(() => {
      return Promise.resolve(mockResult) as any;
    });
    const respuesta = await service.validarUsuario(mockUsuario.correo, mockUsuario.password);
    expect(respuesta.correo).toBe(mockResult.correo);
  });

  it('Devuelve false si el usuario no existe en la Base de Datos', async () => {
    const res = await service.validarUsuario('xxx', 'xxx');
    expect(res).toBe(false);
  });

});

describe('AuthService', () => {
  let service: AuthService;
  let model: Model<UsuarioInterface>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,  LocalStrategy, JwtStrategy, UsuariosService,
        {
          provide: getModelToken('Usuario'),
          useValue: {
            findByIdAndUpdate: jest.fn(),
          },
      }],
      imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    model = module.get<Model<UsuarioInterface>>(getModelToken('Usuario'));
  });

  it('Debe de devolver el token y refreshToke', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockImplementation(() => {
      return Promise.resolve(mockResult) as any;
    });
    const res = await service.login(mockResult);
    expect(res.token).toBeDefined();
    expect(res.refreshToken).toBeDefined();
  });

  it('Debe de actualizar el token', async() => {
    const resp  = await service.generateRefreshToken(mockResult._id);
    expect(resp).toBeDefined();
    expect(typeof resp).toBe('string');
  })
});



