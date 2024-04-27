import { Module, NestModule, MiddlewareConsumer, RequestMethod, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { FxRatesModule } from './fx-rates/fx-rates.module';
import configuration from './config/configuration';
import { CacheModule } from '@nestjs/cache-manager';
import { FxConversionModule } from './fx-conversion/fx-conversion.module';
import { UsersModule } from './users/users.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
  MongooseModule.forRoot(configuration().DATABASE_URL),
  ThrottlerModule.forRoot([{
    ttl: 30000,
    limit: 6,
  }]),
    AccountsModule,
    AuthModule,
    FxRatesModule,
  CacheModule.register(),
    FxConversionModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
