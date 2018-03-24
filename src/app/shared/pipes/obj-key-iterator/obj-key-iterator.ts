import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'ObjKeyIterator', pure: false })
export class ObjKeyIterator implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        if (value) {
            let item: Object = new Object();
            item = Object.keys(value);
            return item;
        }
        return null;
    }
}