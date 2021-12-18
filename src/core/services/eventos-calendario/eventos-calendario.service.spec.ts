import { Test, TestingModule } from '@nestjs/testing';
import { EventosCalendarioService } from './eventos-calendario.service';

describe('EventosCalendarioService', () => {
  let service: EventosCalendarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventosCalendarioService],
    }).compile();

    service = module.get<EventosCalendarioService>(EventosCalendarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
