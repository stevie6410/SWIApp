//Core Angular Imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//3rd Party Imports
import { TooltipModule } from "ngx-tooltip";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";

//Module Imports
import { CoreModule } from "../core/core.module";
import { SwiBuilderModule } from '../swi-builder/swi-builder.module';
import { SharedControlsModule } from '../shared-controls/shared-controls.module';
import { SwiBrowserModule } from "../swi-browser/swi-browser.module";
import { SwiImporterModule } from "../swi-importer/swi-importer.module";
import { SwiViewerModule } from "../swi-viewer/swi-viewer.module";
import { SwiManagerModule } from "../swi-manager/swi-manager.module";
import { SwiRepoModule } from "../../modules/swi-repo/swi-repo.module";

//Service Imports
import { SWIFileService } from "../../services/swi-file.service";
import { RepoDocsService } from "../../services/repo-docs.service";
import { ImageStoreService } from "../../services/image-store.service";
import { SWIDuplicateService } from "../../services/swi-duplicate.service";
import { SyncRepoService } from "../../services/sync-repo.service";

//Resolver Imports
import { HSItemsResolver } from "../core/resolvers/hs-items.resolver";
import { SWIsResolver } from "../core/resolvers/swis.resolver";
import { SWIResolver } from "../core/resolvers/swi.resolver";

//Component Imports For Routing
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SwiBuilderScreenComponent } from '../swi-builder/components/swi-builder-screen/swi-builder-screen.component';
import { SwiStageEditComponent } from '../swi-builder/components/swi-stage-edit/swi-stage-edit.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SwiBrowserScreenComponent } from "../swi-browser/components/swi-browser-screen/swi-browser-screen.component";
import { SwiNewComponent } from "../swi-builder/components/swi-new/swi-new.component";
import { SwiHsPickerComponent } from "../swi-builder/components/swi-hs-picker/swi-hs-picker.component";
import { SwiToolEditComponent } from "../swi-builder/components/swi-tool-edit/swi-tool-edit.component";
import { SwiImporterScreenComponent } from "../swi-importer/components/swi-importer-screen/swi-importer-screen.component";
import { SwiViewerScreenComponent } from "../swi-viewer/components/swi-viewer-screen/swi-viewer-screen.component";
import { SwiManagerScreenComponent } from "../swi-manager/components/swi-manager-screen/swi-manager-screen.component";
import { StagesGalleryScreenComponent } from "../swi-viewer/components/stages-gallery-screen/stages-gallery-screen.component";
import { RepoSearchComponent } from "../../modules/swi-repo/components/repo-search/repo-search.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/browser', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'browser', component: SwiBrowserScreenComponent, resolve: { swis: SWIsResolver } },
  { path: 'viewer/:id', component: SwiViewerScreenComponent, resolve: { swi: SWIResolver } },
  { path: 'viewer/:id/stagesgallery', component: StagesGalleryScreenComponent, resolve: { swi: SWIResolver } },
  { path: 'manager/:id', component: SwiManagerScreenComponent, resolve: { swi: SWIResolver } },
  { path: 'builder', component: SwiNewComponent },
  { path: 'builder/:id', component: SwiBuilderScreenComponent, resolve: { swi: SWIResolver } },
  { path: 'builder/:id/stagegroup/:groupid/stages/:stageid', component: SwiStageEditComponent, resolve: { swi: SWIResolver } },
  { path: 'builder/:id/stagegroup/:groupid/tools/:toolid', component: SwiToolEditComponent, resolve: { swi: SWIResolver } },
  { path: 'builder/:id/hsitems', component: SwiHsPickerComponent, resolve: { hsitems: HSItemsResolver, swi: SWIResolver } },
  { path: 'builder/:id/tools/:toolid', component: SwiToolEditComponent, resolve: { swi: SWIResolver } },
  { path: 'importer', component: SwiImporterScreenComponent },
  { path: 'repo/search', component: RepoSearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent
  ],
  imports: [
    CoreModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    SwiBuilderModule,
    BrowserAnimationsModule,
    SharedControlsModule,
    SwiBrowserModule,
    SwiImporterModule,
    SwiViewerModule,
    SwiManagerModule,
    SwiRepoModule,
    TooltipModule
  ],
  providers: [
    SWIFileService,
    ImageStoreService,
    RepoDocsService,
    SyncRepoService,
    SWIDuplicateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
