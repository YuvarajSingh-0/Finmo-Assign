import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { FxConversionService } from './fx-conversion.service';

@Controller('fx-conversion')
export class FxConversionController {
    constructor(private fxConversionService: FxConversionService) { }
    @Post()
    @UseGuards(AuthGuard)
    convertFx(@Req() request:Request,@Body() data: { fromCurrency: string, toCurrency: string, amount: number, quoteId: string }) {
        return this.fxConversionService.convertFx(request['user'].userId, data.fromCurrency, data.toCurrency, data.amount, data.quoteId);
    }
}
