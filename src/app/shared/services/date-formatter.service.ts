import { Injectable } from "@angular/core";

@Injectable()
export class DateFormatterService {
    
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