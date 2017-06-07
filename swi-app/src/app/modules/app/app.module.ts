import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { SWIFileService } from "../../services/swi-file.service";
import { ImageStoreService } from "../../services/image-store.service";
import { AppComponent } from './app.component';
import { SwiBuilderModule } from '../swi-builder/swi-builder.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SwiBuilderScreenComponent } from '../swi-builder/components/swi-builder-screen/swi-builder-screen.component';
import { SwiStageEditComponent } from '../swi-builder/components/swi-stage-edit/swi-stage-edit.component';
import { SharedControlsModule } from '../shared-controls/shared-controls.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToastModule, ToastOptions } from 'ng2-toastr';
import { CustomOptions } from './toastr.options';
import { SwiBrowserModule } from "../swi-browser/swi-browser.module";
import { SwiBrowserScreenComponent } from "../swi-browser/components/swi-browser-screen/swi-browser-screen.component";
import { MomentModule } from "angular2-moment";
import { SwiNewComponent } from "../swi-builder/components/swi-new/swi-new.component";
import { SwiHsPickerComponent } from "../swi-builder/components/swi-hs-picker/swi-hs-picker.component";
import { AppConfigService } from "../../services/repo-config.service";
import { SWIResolve } from "../../resolvers/swi.resolver";
import { SWIsResolve } from "../../resolvers/swis.resolver";
import { HSItemsResolver } from "../../resolvers/hs-items.resolver";
import { SwiToolEditComponent } from "../swi-builder/components/swi-tool-edit/swi-tool-edit.component";
import { CoreModule } from "../core/core.module";
import { SwiImporterModule } from "../swi-importer/swi-importer.module";
import { SwiImporterScreenComponent } from "../swi-importer/components/swi-importer-screen/swi-importer-screen.component";
import { TooltipModule } from "ngx-tooltip";
import { SwiViewerModule } from "../swi-viewer/swi-viewer.module";
import { SwiViewerScreenComponent } from "../swi-viewer/components/swi-viewer-screen/swi-viewer-screen.component";
import { SwiManagerModule } from "../swi-manager/swi-manager.module";
import { SwiManagerScreenComponent } from "../swi-manager/components/swi-manager-screen/swi-manager-screen.component";
import { PackageService } from "../../services/package.service";
import { StagesGalleryScreenComponent } from "../swi-viewer/components/stages-gallery-screen/stages-gallery-screen.component";
import { ModalModule } from "angular2-modal";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";

const appRoutes: Routes = [
  { path: '', redirectTo: '/browser', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'browser', component: SwiBrowserScreenComponent, resolve: { swis: SWIsResolve } },
  { path: 'viewer/:id', component: SwiViewerScreenComponent, resolve: { swi: SWIResolve } },
  { path: 'viewer/:id/stagesgallery', component: StagesGalleryScreenComponent, resolve: { swi: SWIResolve } },
  { path: 'manager/:id', component: SwiManagerScreenComponent, resolve: { swi: SWIResolve } },
  { path: 'builder', component: SwiNewComponent },
  { path: 'builder/:id', component: SwiBuilderScreenComponent, resolve: { swi: SWIResolve } },
  { path: 'builder/:id/stages/:sequence', component: SwiStageEditComponent, resolve: { swi: SWIResolve } },
  { path: 'builder/:id/hsitems', component: SwiHsPickerComponent, resolve: { hsitems: HSItemsResolver, swi: SWIResolve } },
  { path: 'builder/:id/tools/:toolid', component: SwiToolEditComponent, resolve: { swi: SWIResolve } },
  { path: 'importer', component: SwiImporterScreenComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    CoreModule,
    FormsModule,
    HttpModule,
    SwiBuilderModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    SharedControlsModule,
    SwiBrowserModule,
    MomentModule,
    SwiImporterModule,
    TooltipModule,
    SwiViewerModule,
    SwiManagerModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    { provide: ToastOptions, useClass: CustomOptions },
    AppConfigService,
    HSItemsResolver,
    PackageService,
    SWIResolve,
    SWIsResolve,
    HSItemsResolver,
    SWIFileService,
    ImageStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
