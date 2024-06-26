import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCurrency(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsCurrency',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...validationOptions,
                message: `${propertyName} must be a valid ISO 4217 currency code`,
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const validCurrencies: string[] = [
                        'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN',
                        'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL',
                        'BSD', 'BTN', 'BWP', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNH',
                        'CNY', 'COP', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP',
                        'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD',
                        'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'ICP', 'IDR',
                        'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES',
                        'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP',
                        'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT',
                        'MOP', 'MRO', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD',
                        'NGN', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR',
                        'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RUR', 'RWF', 'SAR', 'SBDf',
                        'SCR', 'SDG', 'SDR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SYP',
                        'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS',
                        'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD',
                        'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL'
                    ];
                    return validCurrencies.includes(value);
                },
            },
        });
    };
}