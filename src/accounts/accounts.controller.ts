import { Body, Controller, Req, Get, Post, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService:AccountsService, private readonly authService:AuthService){}
    @Post('top-up')
    @UseGuards(AuthGuard)
    topUp(@Req() request: Request ,@Body() data:{userId: string, amount: number, currency: string}) {
        return this.accountsService.topUp(request['user'].userId, data.amount, data.currency);
    }

    @Post('register')
    register(@Body() data:{username: string,password:string}) {
        return this.accountsService.register(data);
    }
    @Post('login')
    login(@Body() data:{username: string,password:string}) {
        return this.authService.login(data);
    }
    @Get('balances')
    @UseGuards(AuthGuard)
    getBalances(@Req() request: Request) {
        return this.accountsService.getBalances(request['user'].userId);
    }
}
