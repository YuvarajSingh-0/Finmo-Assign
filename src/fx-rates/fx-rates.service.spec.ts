import { Test, TestingModule } from '@nestjs/testing';
import { FxRatesService } from './fx-rates.service';
import { Cache } from '@nestjs/cache-manager';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('FxRatesService', () => {
  let service: FxRatesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        FxRatesService,
        ConfigService,
        {
          provide: 'AXIOS_INSTANCE_TOKEN',
          useValue: {
            get: jest.fn(x => { return { data: { 'Realtime Currency Exchange Rate': { '5. Exchange Rate': '1.2345' } } } }),
          }
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: {
            get: jest.fn(x => x),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FxRatesService>(FxRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should fetch fx rates correctly from api', async () => {
    const mockData = {
      quoteId: '123',
      expiry: '2022-12-31',
      exchangeRate: '1.2345',
    };

    jest.spyOn(service, 'isCached').mockResolvedValue(false);
    jest.spyOn(service, 'getRatesFromApi').mockResolvedValue(mockData);
    jest.spyOn(service, 'getCachedData').mockResolvedValue(mockData);

    const result = await service.fetchFxRates('USD', 'EUR');
    console.log(result);
    expect(result).toMatchObject({
      quoteId: mockData.quoteId,
      expiry: mockData.expiry,
      exchangeRate: mockData.exchangeRate,
    });
  });

  it('should fetch fx rates from cache', async () => {
    const mockData = {
      quoteId: '123',
      expiry: '2022-12-31',
      exchangeRate: '1.2345',
    };

    jest.spyOn(service, 'isCached').mockResolvedValue(true);
    jest.spyOn(service, 'getRatesFromApi').mockResolvedValue(mockData);
    jest.spyOn(service, 'getCachedData').mockResolvedValue(mockData);

    const result = await service.fetchFxRates('USD', 'EUR');
    console.log(result);
    expect(result).toEqual({
      quoteId: mockData.quoteId,
      expiry: mockData.expiry,
      exchangeRate: mockData.exchangeRate,
    });
  });

});
