import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FIXER_API } from 'app/shared/api-key';

@Component({
    selector: 'main-input-area',
    templateUrl: './main-input-area.component.html',
    styleUrls: ['./main-input-area.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainInputArea implements OnInit {

    @Output() graphToggled = new EventEmitter();
    baseCurrencyAmount: number;
    baseCurrencyCode: string;
    resultCurrencyAmount: string; // API retrieves resultCurrencyAmount as string, not number.
    resultCurrencyCode: string;

    currencyData: Object;
    graphData = [{ label: '', data: [] }];

    graphShown = false;

    constructor(private http: HttpClient) {
        this.baseCurrencyCode = 'EUR'; // Default to EUR due to API base currency limitations.
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
            // Convert result into exchanged rate, then fix in 2 decimal points to emulate currency.
            const resultCurrencyAmount = results.rates[this.resultCurrencyCode] * this.baseCurrencyAmount;
            this.resultCurrencyAmount = parseFloat(resultCurrencyAmount.toString()).toFixed(2);
        });
    }

    switchCurrency() {
        [this.baseCurrencyCode, this.resultCurrencyCode] = [this.resultCurrencyCode, this.baseCurrencyCode];
        this.resetGraph();
    }

    resetGraph() {
        this.graphData = [{ label: '', data: [] }];
        this.graphShown = false;
    }

    viewGraph() {
        this.graphShown = true;
        this.graphData = [{ label: '', data: [] }];

        // Variables for calculating percentage tendency over 30 days.
        let newestRate: number;
        let oldestRate: number;
        let percentageTendency: number;

        const params = {
            access_key: FIXER_API,
            base: this.baseCurrencyCode,
            symbols: [this.resultCurrencyCode]
        };
        const currentDate = new Date();
        for (let i = 0; i < 30; i++) {
            // Reduce date by 'i' number of days, then format it for the API address.
            currentDate.setDate(currentDate.getDate() - i);
            const date = this.formatDate(currentDate);
            this.graphData[0].data[i] = 1.5;
            if (i === 29) this.graphData[0].data[i] = 1.8;
            if (i === 0) {
                newestRate = this.graphData[0].data[i];
            }
            if (i === 29) {
                oldestRate = this.graphData[0].data[i];
                this.graphData[0].data.reverse();
                const increase = newestRate - oldestRate;
                const percentage = increase / oldestRate * 100;
                percentage > 0 ? this.graphData[0].label = 'Overall Increase: ' + percentage + '%' :
                this.graphData[0].label = 'Overall Decrease: ' + percentage + '%'
            }
            /*this.http.get('http://data.fixer.io/api/' + date, { params: params }).subscribe((results: any) => {
                this.graphData.data[i] = results.rates[0];
            });*/
        }
    }

    formatDate(date: any) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        // If either month or day are in single digits, add a 0 - necessary for the API.
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        return year + '-' + month + '-' + day;
    }
}
