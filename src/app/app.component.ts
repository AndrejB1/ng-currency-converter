import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FIXER_API } from './shared/api-key';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  data = {};

  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get('http://data.fixer.io/api/latest?access_key=' + FIXER_API).subscribe((results: any) => {
      this.data = results;
    })
  }
}
