import { Module } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';
import { FxRatesController } from './fx-rates.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, CacheModule.register(
    {
      isGlobal: true
    }

  )],
  providers: [FxRatesService, ConfigService],
  controllers: [FxRatesController]
})
export class FxRatesModule { }
