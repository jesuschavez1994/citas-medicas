import { Test, TestingModule } from '@nestjs/testing';
import { EventosCalendarioController } from './eventos-calendario.controller';

describe('EventosCalendarioController', () => {
  let controller: EventosCalendarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventosCalendarioController],
    }).compile();

    controller = module.get<EventosCalendarioController>(EventosCalendarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
