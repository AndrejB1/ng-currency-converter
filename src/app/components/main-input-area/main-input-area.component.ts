import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FIXER_API } from 'app/shared/api-key';
import { DateFormatterService } from "../../shared/services/date-formatter.service";

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
    resultCurrencyAmounts: string[]; // API retrieves resultCurrencyAmount as string, not number.
    resultCurrencyCodes: string[]; // Array due to potential of adding more currencies in version 2.
    percentageTendencyLabel: string;
    tendencyPositive: boolean; // Used for coloring label and displaying appropriate icon above graph.
    /*
    dateFrom: Date;
    dateTo: Date;
    baseCryptoCode: string;
    resultCryptoCode: string;
    */

    currencyData: Object;
    // this.cryptoData // Potential for version 2
    graphData = [];
    graphLabels = [];

    graphShown = false;
    labelShown = false; // Percentage tendency label.

    constructor(private http: HttpClient, private dateFormatter: DateFormatterService) {
        this.baseCurrencyCode = 'EUR'; // Default to EUR due to API base currency limitations.
        this.resultCurrencyCodes = ['']; // Initialize these arrays so that the custom-select will appear
        this.resultCurrencyAmounts = ['0.00'];
    }
    ngOnInit() {
        this.getData();
    }

    getData() {
        // Get a list of all available currencies.
        const params = {
            access_key: FIXER_API
        };
        this.http.get('http://data.fixer.io/api/symbols', { params: params }).subscribe((results: any) => {
            this.currencyData = results.symbols;
        });

        /* Potential for cryptocurrency API here.
        this.http.get('CRYPTOCURRENCY API', { params: params }).subscribe((results: any) => {
            this.cryptoData = results.symbols;
        });
        */
    }

    convertCurrency() {
        this.resultCurrencyAmounts = [];

        if (!this.resultCurrencyCodes || this.resultCurrencyCodes.length === 0) {
            // If somehow no result currency is selected, do nothing.
            return;
        }
        /* At this point, Crypto Currency selection could be detected and the API changed
            if (this.baseCryptoCode || this.resultCryptoCode) {
                params = Theoretical params for crypto API
            } else {
                params = Default currency API
            }
        */
        const params = {
            access_key: FIXER_API,
            base: this.baseCurrencyCode,
            symbols: this.resultCurrencyCodes
        };
        this.http.get('http://data.fixer.io/api/latest', { params: params }).subscribe((results: any) => {
            // Convert result into exchanged rate, then fix in 2 decimal points to emulate currency.
            for (const code in results.rates) {
                const resultCurrencyAmount = results.rates[code] * this.baseCurrencyAmount;
                this.resultCurrencyAmounts.push(parseFloat(resultCurrencyAmount.toString()).toFixed(2)); // Would avoid doing this with Cryptocurrency values.
            }
        });
    }

    switchCurrency() {
        // Swap base currency into result currency and vice-versa. Method would need to be revamped in version 2 to support multiple currencies.
        [this.baseCurrencyCode, this.resultCurrencyCodes[0]] = [this.resultCurrencyCodes[0], this.baseCurrencyCode];
        this.resetGraph();
    }

    // Resets graph any time the currencies are changed
    resetGraph() {
        this.graphData = [];
        this.graphLabels = [];
        this.graphShown = false;
        this.labelShown = false;
    }

    viewGraph() {

        this.graphShown = true;

        if (this.graphData.length > 0 && this.graphLabels.length > 0) {
            // If graph data has not been reset, avoid redoing the operation, and display data which is already present.
            return;
        }

        // Graph does not automatically detect data changes, so data must be kept in these variables, then sent to graph later.
        let tempLabels = [];
        let tempGraphData = [{ label: '', data: [] }];

        // Variables for calculating percentage tendency over 30 days.
        let newestRate: number;
        let oldestRate: number;
        let percentageTendency: number;

        let amountOfDays = 30; // Default amount of days for graph and tendency calculation.
        /* if (this.dateFrom && this.dateTo) {
            // If a date range was picked, this block could be used to calculate new amountOfDays
            // and insert dates into params below.
            // The api endpoint can also be changed this way.
        }*/
        const params = {
            access_key: FIXER_API,
            base: this.baseCurrencyCode,
            symbols: this.resultCurrencyCodes
        };

        // With full API access, the endpoint would be different and there would be no need for this loop.
        for (let i = 0; i < amountOfDays; i++) {
            const currentDate = new Date();
            // Reduce date by 'i' number of days, then format it for the API address.
            currentDate.setDate(currentDate.getDate() - i);
            const date = this.dateFormatter.formatDate(currentDate);
            tempLabels.push(date);

            this.resultCurrencyCodes.forEach((item: any, index: any) => {
                tempGraphData[index].label = item;
            })

            // ----- REMOVE LATER
            /*tempGraphData[0].data[i] = 1.5;
            if (i === 29) tempGraphData[0].data[i] = 1.8;
            if (i === 12) tempGraphData[0].data[i] = 1.57;
            if (i === 24) tempGraphData[0].data[i] = 1.76;
            this.percentageTendencyLabel = 'Overall Increase: 10%';
            this.tendencyPositive = true;*/
            // --------------------------------------------
            this.http.get('http://data.fixer.io/api/' + date, { params: params }).subscribe((results: any) => {
                for (const code in results.rates) {
                    // Hardcoded tempGraphData position to 0 for simplicity. Would be easily changed to a variable with a more comprehensive API.
                    tempGraphData[0].data[i] = results.rates[code];

                    if (i === 0) {
                        // Upon receiving first value, set newestRate.
                        newestRate = tempGraphData[0].data[i];
                    }
                    if (i === amountOfDays - 1) {
                        // Upon receiving final value, set oldestRate.
                        oldestRate = tempGraphData[0].data[i];
                    }
                    // If both newest and oldest rate have been received, calculate the percentage change.
                    if (oldestRate && newestRate) {
                        const increase = newestRate - oldestRate;
                        percentageTendency = increase / oldestRate * 100;
                        let percentageLabel = parseFloat(percentageTendency.toString()).toFixed(2);
                        if (percentageTendency > 0) {
                            this.percentageTendencyLabel = 'Overall Increase: ' + percentageLabel + '%';
                            this.tendencyPositive = true;
                        } else {
                            this.percentageTendencyLabel = 'Overall Decrease: ' + percentageLabel + '%';
                            this.tendencyPositive = false;
                        }

                    }

                    // Once all APIs are complete, send data to graph.
                    if (tempGraphData[0].data.length === amountOfDays && percentageTendency) {
                        // Akveo graph inserts values from left to right, starting from 0, so we need to reverse the arrays
                        tempGraphData[0].data.reverse();
                        tempLabels.reverse();
                        this.graphData = tempGraphData;
                        this.graphLabels = tempLabels;
                        this.labelShown = true;
                    }
                }
            });
        }
    }

    // Ensure the user doesn't input letters or other special characters into the base currency amount input
    checkInput(event) {
        let str = event.key.match(new RegExp(/[0-9]|\.|Backspace/gi));
        if (str === null) {
            event.preventDefault();
        }
    }

}
