import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkClipDimensions(event.target);
  }
  data = {};

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.checkClipDimensions(window);
    this.getData();
  }

  graphToggled() {
    this.checkClipDimensions(window);
  }

  checkClipDimensions(target: any) {
    let centerHeight = this.main.nativeElement.clientHeight; // height of the central box.
    let centerWidth = this.main.nativeElement.clientWidth; // width of the central box.
    let topSpace = this.main.nativeElement.offsetTop;
    let leftSpace = this.main.nativeElement.offsetLeft;
  
    let newClipPaddingRight = target.outerWidth - (leftSpace + centerWidth) + 'px';
    let newClipPaddingBottom = target.innerHeight - topSpace - centerHeight + 'px';
    this.glass.nativeElement.style.clipPath = 'inset(130px ' + newClipPaddingRight + ' ' + newClipPaddingBottom + ' 33% round 10px)';
  }

  getData() {
    this.http.get('http://data.fixer.io/api/latest?access_key=' + FIXER_API).subscribe((results: any) => {
      this.data = results;
    })
  }
}
