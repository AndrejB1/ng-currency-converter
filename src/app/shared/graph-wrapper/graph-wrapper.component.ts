import { Component, AfterViewInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { FIXER_API } from 'app/shared/api-key';

@Component({
    selector: 'graph-wrapper',
    templateUrl: './graph-wrapper.component.html'
})
export class GraphWrapper implements AfterViewInit {

    @Input() datasets;
    @Input() labels;
    @Output() graphToggled = new EventEmitter();

    ngAfterViewInit() {
        this.graphToggled.emit(true);
    }

    ngOnDestroy() {
        this.graphToggled.emit(false);
    }

}