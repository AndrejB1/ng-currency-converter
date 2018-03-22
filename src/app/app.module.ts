import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainInputArea } from './components/main-input-area/main-input-area.component';
import { CustomSelect } from './shared/custom-select/custom-select';
import { ListFilter } from './shared/pipes/list-filter/list-filter';
import { ObjKeyIterator } from './shared/pipes/obj-key-iterator/obj-key-iterator';

@NgModule({
  declarations: [
    AppComponent,
    MainInputArea,
    CustomSelect,
    ObjKeyIterator,
    ListFilter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
