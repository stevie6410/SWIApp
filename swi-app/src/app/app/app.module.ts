// Core Angular Imports
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// 3rd Party Imports
import { ToastModule, ToastOptions } from "ng2-toastr/ng2-toastr";

// Module Imports
import { CoreModule } from "app/core/core.module";
import { AppRoutingModule } from "../app-routing/app-routing.module";
import { SwiBuilderModule } from "../swi-builder/swi-builder.module";
import { SharedModule } from "../shared/shared.module";
import { SwiBrowserModule } from "../swi-browser/swi-browser.module";
import { SwiImporterModule } from "../swi-importer/swi-importer.module";
import { SwiViewerModule } from "../swi-viewer/swi-viewer.module";
import { SwiManagerModule } from "../swi-manager/swi-manager.module";
import { SwiRepoModule } from "../swi-repo/swi-repo.module";
import { SwiStandardToolingModule } from "app/swi-standard-tooling";

// Module Components
import { AppComponent } from "./components/app/app.component";
import { HomeComponent } from "./components/home/home.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { ToastCustomOptions } from "app/core/toastr.options";
import { EnvironmentService } from "app/app/services/environment.service";
import { SwiUsersModule } from "app/swi-users";
import { SwiSettingsModule } from "app/swi-settings";
import { GlobalErrorHandler } from "./services/error-handler.service";
import { LoggingService } from "./services/logging.service";

export function initEnvironment(envService: EnvironmentService) {
  return () => envService.load();
}

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
    SwiRepoModule,
    SwiStandardToolingModule,
    SwiUsersModule,
    SwiSettingsModule
  ],
  providers: [
    { provide: ToastOptions, useClass: ToastCustomOptions },
    { provide: APP_INITIALIZER, useFactory: initEnvironment, deps: [EnvironmentService], multi: true },
    EnvironmentService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    LoggingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
