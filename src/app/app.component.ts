import { Component, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FIXER_API } from './shared/api-key';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('glass') glass: ElementRef;
  @ViewChild('main') main: ElementRef;
  data = {};
  graphActive: boolean;

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.getData();
  }

  graphToggled(active: boolean) {
    this.graphActive = active;
    this.changeDetectorRef.detectChanges(); // Do explicit check to avoid throwing error.
  }

  getData() {
    this.http.get('http://data.fixer.io/api/latest?access_key=' + FIXER_API).subscribe((results: any) => {
      this.data = results;
    })
  }
}
