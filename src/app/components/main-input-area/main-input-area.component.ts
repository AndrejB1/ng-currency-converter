import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FIXER_API } from 'app/shared/api-key';

@Component({
    selector: 'main-input-area',
    templateUrl: './main-input-area.component.html',
    styleUrls: ['./main-input-area.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainInputArea implements OnInit {

    baseCurrencyAmount: number;
    baseCurrencyCode: string;
    resultCurrencyAmount: string;
    resultCurrencyCode: string;

    currencyData: Object;

    constructor(private http: HttpClient) {

    }
    ngOnInit() {
        this.getData();
    }

    getData() {
        const params = {
            access_key: FIXER_API
        };
        this.http.get('http://data.fixer.io/api/symbols', { params: params }).subscribe((results: any) => {
            this.currencyData = results.symbols;
        });
    }

    convertCurrency() {
        if (!this.resultCurrencyCode) {
            return;
        }
        const params = {
            access_key: FIXER_API,
            base: this.baseCurrencyCode,
            symbols: [this.resultCurrencyCode]
        };
        this.http.get('http://data.fixer.io/api/latest', { params: params }).subscribe((results: any) => {
            const resultCurrencyAmount = results.rates[this.resultCurrencyCode] * this.baseCurrencyAmount;
            this.resultCurrencyAmount = parseFloat(resultCurrencyAmount.toString()).toFixed(2);
        });
    }

    switchCurrency() {
        [this.baseCurrencyCode, this.resultCurrencyCode] = [ this.resultCurrencyCode, this.baseCurrencyCode];
    }

    convertToCurrencyFloat(value: number) {
       // return +(Math.round(value + 'e+2') + 'e-2');
    }
}
