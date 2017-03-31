import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SwiBuilderModule } from '../swi-builder/swi-builder.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SwiBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
