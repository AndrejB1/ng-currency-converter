import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Navbar } from "./components/navbar/navbar.component";
import { MainInputArea } from './components/main-input-area/main-input-area.component';

import { GraphWrapper } from "./shared/graph-wrapper/graph-wrapper.component";
import { CustomSelect } from './shared/custom-select/custom-select';
import { ListFilter } from './shared/pipes/list-filter/list-filter';
import { ObjKeyIterator } from './shared/pipes/obj-key-iterator/obj-key-iterator';
import { DateFormatterService } from "./shared/services/date-formatter.service";

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    MainInputArea,
    // Custom components
    Navbar,
    GraphWrapper,
    CustomSelect,
    // Pipes
    ObjKeyIterator,
    ListFilter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [DateFormatterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
