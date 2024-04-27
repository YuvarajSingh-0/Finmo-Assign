import { Test, TestingModule } from '@nestjs/testing';
import { FxRatesController } from './fx-rates.controller';
import { FxRatesService } from './fx-rates.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('FxRatesController', () => {
  let controller: FxRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      controllers: [FxRatesController],
      providers: [FxRatesService, ConfigService, {
        provide: 'AXIOS_INSTANCE_TOKEN',
        useValue: {
          get: jest.fn(x => { return { data: { 'Realtime Currency Exchange Rate': { '5. Exchange Rate': '1.2345' } } } }),
        },
      }, {
          provide: 'CACHE_MANAGER',
          useValue: {
            get: jest.fn(x => x),
            set: jest.fn(),
          },
        }],
    }).compile();

    controller = module.get<FxRatesController>(FxRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
