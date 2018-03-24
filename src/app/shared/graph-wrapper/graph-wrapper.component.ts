import { Component, AfterViewInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { FIXER_API } from 'app/shared/api-key';

@Component({
    selector: 'graph-wrapper',
    templateUrl: './graph-wrapper.component.html',
    styleUrls: ['./graph-wrapper.component.scss']
})
export class GraphWrapper implements AfterViewInit {

    @Input() datasets;
    @Output() graphToggled = new EventEmitter();

    private labels = [
        '1', '', '3', '', '5', '',
        '7', '', '9', '', '11', '',
        '13', '', '15', '', '17', '',
        '19', '', '21', '', '23', '',
        '25', '', '27', '', '29', '30'];

    ngAfterViewInit() {
        this.graphToggled.emit();
    }

    ngOnDestroy() {
        this.graphToggled.emit();
    }

}