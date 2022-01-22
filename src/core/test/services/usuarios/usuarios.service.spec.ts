import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UsuarioInterface } from 'src/core/interfaces/usuario.interface';
import { QueryMock } from '../../mock/query.mock';
import { CollaboratorMock, SchemaMock } from '../../mock/schema.mock';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';

const calls = ['limit', 'skip', 'sort', 'select', 'exec'];

const mockUsuario = {
  "name": "test",
  "email": "test@gamil.com",
  "password": "12345678",
  "status": true,
  "google": false
}

const mockResult = {
  google: false,
  status: true,
  password: '$2b$10$kiZtz2qtyLVKpJITXeySju7fkNEAJwPYbMcbrqH9SDSERLZf7zEO.',
  email: 'test@gamil.com',
  name: 'test',
  _id:"61cb3641dad84d8884bef840"
}
// Mock Para actualizar un usuario
const mockUsuarioUpdate ={
  "google": false,
  "status": true,
  "password": "87654321",
  "name": "test_update",
  "email": "test_update@gmail.com",
  "id": "61cb4da115be8382db1d9328"
}

const mockResultUpdate = {
  "google": false,
  "status": false,
  "email": "test_update@gmail.com",
  "name": "test_update",
  "refreshtoken": "8gD0kTL2MOfB6HHHEOiDoPqfGTV1rSrj",
  "refreshtokenexpires": "Tue Jan 04 2022 01:49:03 GMT+0800 (hora estándar de China)",
  "id": "61cb4da115be8382db1d9328"
}


describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService,
      {
        provide: getModelToken('Usuario'),
        useValue: {}
      }],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('Debe de ser definido', () => {
    expect(service).toBeDefined();
  });
});


describe('UsuariosService', () => {
  let service: UsuariosService;
  let model: Model<UsuarioInterface>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService,
      {
        provide: getModelToken('Usuario'),
        useValue: {
          create: jest.fn(),
          findOne: jest.fn().mockImplementation(() => mockResult),
          findByIdAndUpdate: jest.fn().mockImplementation(() => mockResultUpdate),
          find: jest.fn().mockImplementation(() => [mockResult]),
          exec: jest.fn()
        }
      }],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    model = module.get<Model<UsuarioInterface>>(getModelToken('Usuario'));
  });

  it('Debe de crear un nuevo usuario', async () => {
    jest.spyOn(model, 'create').mockImplementation(() => mockResult);
    const resp = await service.crearNuevoUsuario(mockUsuario);
    expect(resp).toBeDefined();
    expect(resp).toEqual(mockResult);
  });

  it('Debe de obtener un usuario', async () =>{
    const resp = await service.obtenerUsuario(mockUsuario.email);
    expect(resp).toBeDefined();
    expect(resp).toEqual(mockResult);
  });

  it('Debe de actualizar un usuario', async () =>{ 
    const resp = await service.actualizarUsuario(mockUsuarioUpdate.id, mockUsuarioUpdate);
    expect(resp).toBeDefined();
    // se verifica que el email de la respuesta sea igual al email del mock
    expect(resp.email).toEqual(mockUsuarioUpdate.email);
  });

  it('Debe de cambiar el status de un usuario a false', async () =>{
    const resp = await service.borrarUsuario(mockUsuarioUpdate.id);
    expect(resp).toBeDefined();
    expect(resp.status).toEqual(false);
  });

  it('Debe de mostrar un mensaje cuando el status del usuario es falso', async () =>{
    const mockUsuarioDelete = {"id": "61cb4da115be8382db1d9328"}
    const mockResultDelete = {"message": "Usuario no encontrado"}
    jest.spyOn(model, 'findByIdAndUpdate').mockImplementationOnce(() =>Promise.resolve(mockResultDelete) as any,);
    const resp = await service.borrarUsuario(mockUsuarioDelete.id) as any;
    const { message } = resp;
    expect(resp).toBeDefined();
    expect( message ).toBe('Usuario no encontrado');
  });

  it('Debe de actualizar el token', async() =>{
    const mockUsuario = {
      refreshtoken: "iIMZbAdP0HpYaobUM1CJt7glmnLTlrZe",
      id: "61cb4da115be8382db1d9328"
    }
    const { id, refreshtoken } = mockUsuario;
    var refreshtokenexpires =new Date();
    refreshtokenexpires.setDate(refreshtokenexpires.getDate() + 6);
    const resp = await service.guardarTokenRefresh(id, refreshtoken, refreshtokenexpires);
    expect(resp).toBeDefined();
    expect(resp.refreshtoken).toEqual(mockResultUpdate.refreshtoken);
  })

  it('Debe de obtener un array de usuarios', async() =>{
    model.find = SchemaMock.asBuilderCall(
      calls,
      jest
        .fn()
        .mockResolvedValueOnce([CollaboratorMock.asDocumentResponse]),
    );
    const resp = await service.obtenerUsuarios(QueryMock.asMongoQueryModel) as any;
    expect(resp).toBeDefined();
    expect(resp[0].users.length).toBe(2);
  })

});
