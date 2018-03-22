import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FIXER_API } from 'app/shared/api-key';

@Component({
    selector: 'custom-select',
    templateUrl: './custom-select.html'
})
export class CustomSelect {

    @Input() data: any; // Data which will go into the dropdown list.
    @Output() selectionMade = new EventEmitter(); // Notify the parent when an item has been selected.

    // Variables for storing manually selected items from the dropdownMenu;
    selectedItemString: string;
    selectedItemAdditionalData: string;

    showSelectList = false;

    constructor(private http: HttpClient) {}

    setSelectedItem(data: string, additionalData?: string) {
        this.selectedItemString = data;
        this.selectedItemAdditionalData = additionalData;
        // Emit selected items, with possible additionalData.
        this.selectionMade.emit({data: data, additionalData: additionalData});
        this.showSelectList = false;
    }
}
