import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainInputArea } from './components/main-input-area/main-input-area.component';
import { GraphComponent } from './components/graph/graph.component';
import { GraphWrapper } from "./shared/graph-wrapper/graph-wrapper.component";
import { CustomSelect } from './shared/custom-select/custom-select';
import { ListFilter } from './shared/pipes/list-filter/list-filter';
import { ObjKeyIterator } from './shared/pipes/obj-key-iterator/obj-key-iterator';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    MainInputArea,
    GraphComponent,
    GraphWrapper,
    CustomSelect,
    ObjKeyIterator,
    ListFilter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
