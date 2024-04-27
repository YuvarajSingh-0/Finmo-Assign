import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToUpperCasePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (value.currency) {
            value.currency = value.currency.toUpperCase();
        }
        if (value.from_curr) {
            value.from_curr = value.from_curr.toUpperCase();
        }
        if (value.to_curr) {
            value.to_curr = value.to_curr.toUpperCase();
        }
        if (value.fromCurrency){
            value.fromCurrency = value.fromCurrency.toUpperCase();
        }
        if (value.toCurrency){
            value.toCurrency = value.toCurrency.toUpperCase();
        }
        return value;
    }
}