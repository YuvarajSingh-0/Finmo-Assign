import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { FxConversionService } from './fx-conversion.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ConversionDto } from './conversion.dto';
import { ToUpperCasePipe } from 'src/pipes/to-uppercase-pipe';

@Controller('fx-conversion')
export class FxConversionController {
    constructor(private fxConversionService: FxConversionService) { }
    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ToUpperCasePipe(),new ValidationPipe())
    @ApiCreatedResponse({ description: 'Fx Conversion Successful' })
    @ApiBadRequestResponse({ description: 'Invalid data/data Validation Failed/Insufficient Balance' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBearerAuth()
    convertFx(@Req() request:Request,@Body() data: ConversionDto) {
        return this.fxConversionService.convertFx(request['user'].userId, data.fromCurrency, data.toCurrency, data.amount, data.quoteId);
    }
}
