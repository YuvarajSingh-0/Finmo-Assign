import { Module } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';
import { FxRatesController } from './fx-rates.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis'; // Remove this line if redis is not installed and running

@Module({
  imports: [HttpModule, CacheModule.register(
    {
      // Remove the Three lines below if redis is not installed and running
      store: redisStore,
      host: 'localhost',
      port: 6379,
      isGlobal: true
    }

  )],
  providers: [FxRatesService, ConfigService],
  controllers: [FxRatesController]
})
export class FxRatesModule { }
