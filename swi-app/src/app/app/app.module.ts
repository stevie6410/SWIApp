//Core Angular Imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//3rd Party Imports
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";

//Module Imports
import { CoreModule } from "app/core/core.module";

import { AppRoutingModule } from "../app-routing/app-routing.module";
import { SwiBuilderModule } from '../swi-builder/swi-builder.module';
import { SharedModule } from '../shared/shared.module';
import { SwiBrowserModule } from "../swi-browser/swi-browser.module";
import { SwiImporterModule } from "../swi-importer/swi-importer.module";
import { SwiViewerModule } from "../swi-viewer/swi-viewer.module";
import { SwiManagerModule } from "../swi-manager/swi-manager.module";
import { SwiRepoModule } from "../swi-repo/swi-repo.module";

//Module Components
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToastCustomOptions } from "app/core/toastr.options";
import { ToastModule,ToastOptions } from "ng2-toastr/ng2-toastr";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent
  ],
  imports: [
    ToastModule,
    CoreModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    SwiBuilderModule,
    BrowserAnimationsModule,
    SharedModule,
    SwiBrowserModule,
    SwiImporterModule,
    SwiViewerModule,
    SwiManagerModule,
    SwiRepoModule
  ],
  providers: [
    { provide: ToastOptions, useClass: ToastCustomOptions },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
