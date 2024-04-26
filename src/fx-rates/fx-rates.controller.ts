import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';


@Controller('fx-rates')
export class FxRatesController {

    constructor(private readonly fxRatesService: FxRatesService) { }

    @Get()
    getFxRates(@Query('from_curr') from_curr: string, @Query('to_curr') to_curr: string){
        return this.fxRatesService.getFxRates(from_curr, to_curr);
    }
}
