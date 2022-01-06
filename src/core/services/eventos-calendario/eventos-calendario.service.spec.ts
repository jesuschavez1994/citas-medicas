import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { EventosCalendarioService } from './eventos-calendario.service';
import { EventoCalendarioInterface } from '../../../core/interfaces/evento-calendario.interface';
import { Model } from 'mongoose';
import { CollaboratorMock, SchemaMock } from '../test/mock/schema.mock';
import { QueryMock } from '../test/mock/query.mock';

const calls = ['limit', 'skip', 'sort', 'select', 'exec'];

const mockResult = {
  "usuario": "61cb3641dad84d8884bef840",
  "fechaFinal": "1970-01-01T00:00:00.002Z",
  "fechaInicio": "1970-01-01T00:00:00.001Z",
  "descripcion": "Consulta Jesus",
  "titulo": "Consulta",
  "id": "61cf63d31de541edc9c2b6bf"
}


const evento = {
	titulo: "Consulta",
	descripcion: "Consulta Jesus",
	fechaInicio: new Date(),
	fechaFinal: new Date(),
}

const actualizarEvento ={
  titulo: "consulta suspendida",
  descripcion: "Consulta suspendida",
  fechaInicio: new Date(),
	fechaFinal: new Date(),
}

const EventoEliminado = {
  _id:  "61bf7a329f52f83c2adbc975",
  fechaFinal: '1970-01-01T00:00:00.002Z',
  fechaInicio: '1970-01-01T00:00:00.001Z',
  descripcion: 'Consulta suspendida',
  titulo: 'consulta suspendida',
  usuario: "61b7b3888a91471c9d6a6ad9",
  __v: 0
}

const idEvento = "61bf7a329f52f83c2adbc975"
const idUsuario = "61cb3641dad84d8884bef840"

describe('EventosCalendarioService', () => {
  let service: EventosCalendarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventosCalendarioService,
        {
          provide: getModelToken('EventoCalendario'),
          useValue: {}
        }
      ],
      imports: [],
    }).compile();

    service = module.get<EventosCalendarioService>(EventosCalendarioService);
  });

  it('Debe de ser definido', () => {
    expect(service).toBeDefined();
  });
});

describe('EventosCalendarioService', () => {
  let service: EventosCalendarioService;
  let model: Model<EventoCalendarioInterface>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventosCalendarioService,
        {
          provide: getModelToken('EventoCalendario'),
          useValue: {   
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findById: jest.fn().mockImplementation(() => EventoEliminado),
            findByIdAndDelete: jest.fn(),
          }
        }
      ],
      imports: [],
    }).compile();

    service = module.get<EventosCalendarioService>(EventosCalendarioService);
    model = module.get<Model<EventoCalendarioInterface>>(getModelToken('EventoCalendario'));
  });

  it('Debe de crear un evento en el calendario', async() => {
    jest.spyOn(model, 'create').mockImplementation(() => mockResult);
    const resp = await service.crearEventoCalendario(evento, idUsuario);
    expect(service).toBeDefined();
    expect( resp ).toEqual(mockResult);
  });

  it('Debe de eliminar un evento', async() =>{
    const spyOn = jest.spyOn(model, 'findByIdAndDelete').mockImplementationOnce(() =>Promise.resolve(EventoEliminado) as any,);
    const resp = await service.eliminarEvento(idEvento);
    expect(resp).toEqual(EventoEliminado);
    expect(spyOn).toHaveBeenCalledWith(idEvento);
  });

  it('Debe de retornar false si el evento a eliminar  no existe', async() =>{
    const spyOn = jest.spyOn(model, 'findByIdAndDelete').mockImplementationOnce(() =>Promise.resolve(false) as any);
    const resp = await service.eliminarEvento(idEvento);
    expect(resp).toEqual(false);
    expect(spyOn).toHaveBeenCalledWith(idEvento);
  })

  it('Debe de actualizar el evento del calendario', async() =>{
    const calls = ['populate', 'exec'];
    model.findByIdAndUpdate = SchemaMock.asBuilderCall(calls,
      jest
      .fn()
      .mockResolvedValueOnce([CollaboratorMock.mockResultUpdate]),
    );
    const resp = await service.actualizarEvento(idEvento, QueryMock.asMongoQueryModel) as any;
    expect(resp[0]).toEqual(CollaboratorMock.mockResultUpdate);
  });

});
