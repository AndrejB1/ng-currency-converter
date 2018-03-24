import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FIXER_API } from 'app/shared/api-key';

@Component({
    selector: 'graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

    @Input() data;

    range: any;
    median: any;
    numbers: number[];
    dataNumberArray = [];

    constructor(private http: HttpClient) {
        this.numbers = Array(10).fill(1, 0, 10);
    }

    ngOnInit() {
        // this.getData();
    }

    ngOnChanges() {
        let highestValue = 0;
        let lowestValue;
        for (let num in this.data) {
            this.dataNumberArray.push(this.data[num]);
            if (!lowestValue) lowestValue = this.data[num];
            if (this.data[num] < lowestValue) {
                lowestValue = this.data[num];
            }
            if (this.data[num] > highestValue) {
                highestValue = this.data[num];
            }
        }
        this.dataNumberArray.sort();
        this.median = this.dataNumberArray[Math.ceil(this.dataNumberArray.length / 2)];
        this.range = highestValue - lowestValue;
        this.range = parseFloat(this.range.toString()).toFixed(2);

        console.log(this.median);
        console.log(this.range);
        
    }

}