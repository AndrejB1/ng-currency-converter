import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ListFilter', pure: false })
export class ListFilter implements PipeTransform {

    // If the user inputs a string, check every word in both key and value to see if they match input.
    transform(values: any, args: any): any {
        if (values) {
            const item: Object = new Object();
            for (const key in values) {
                // Make both key and value lowercase for filtering.
                const keyLC = key.toLowerCase();
                const valueLC = values[key].toLowerCase();
                let passesFilter = false; // Use this var to see if object will remain in the list.

                const valueStringArray = valueLC.split(' '); // Split the value to filter every word.
                for (const str of valueStringArray) {
                    if (str.startsWith(args.toLowerCase())) {
                        passesFilter = true;
                    }
                }
                if (keyLC.startsWith(args.toLowerCase())) {
                    passesFilter = true;
                }

                if (passesFilter) { // If the user input matches either key or value, the item passes the filter
                    item[key] = values[key];
                }
            }
            return item; // .map(key => value[key]);
        }
        return null;
    }
}
