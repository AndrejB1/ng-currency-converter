import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FIXER_API } from 'app/shared/api-key';

@Component({
    selector: 'main-input-area',
    templateUrl: './main-input-area.component.html'
})
export class MainInputArea implements OnInit {

    baseCurrencyAmount: string;
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
        this.http.get('http://data.fixer.io/api/symbols?access_key=' + FIXER_API).subscribe((results: any) => {
            this.currencyData = results.symbols;
        });
    }

    convertCurrency() {
        if (!this.resultCurrencyCode) {
            return;
        }
        const params = {
            access_key: FIXER_API,
            from: this.baseCurrencyCode,
            to: this.resultCurrencyAmount,
            amount: this.baseCurrencyAmount
        }
        this.http.get('http://data.fixer.io/api/convert', {params: params}).subscribe((results: any) => {
            this.currencyData = results.symbols;
        });
    }
}
