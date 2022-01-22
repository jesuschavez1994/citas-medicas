import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { EventosCalendarioService } from '../../core/services/eventos-calendario/eventos-calendario.service';
import { EventosCalendarioController } from './eventos-calendario.controller';

describe('EventosCalendarioController', () => {
  let controller: EventosCalendarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventosCalendarioController],
      providers: [
        EventosCalendarioService,
        {
          provide: getModelToken('EventoCalendario'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        }
      ],
    }).compile();

    controller = module.get<EventosCalendarioController>(EventosCalendarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
