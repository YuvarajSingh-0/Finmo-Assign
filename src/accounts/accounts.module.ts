import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/users.schema';
import { AccountSchema } from 'src/schemas/accounts.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule,MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }, {name: 'Accounts', schema: AccountSchema}])],
  providers: [AccountsService,AuthService],
  controllers: [AccountsController]
})
export class AccountsModule {}
