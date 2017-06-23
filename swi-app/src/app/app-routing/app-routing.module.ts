//Angualr Core Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

//Component Imports For Routing
import { HomeComponent } from '../app/components/home/home.component';
import { SwiBuilderScreenComponent } from '../swi-builder/components/swi-builder-screen/swi-builder-screen.component';
import { SwiStageEditComponent } from '../swi-builder/components/swi-stage-edit/swi-stage-edit.component';
import { SwiBrowserScreenComponent } from "../swi-browser/components/swi-browser-screen/swi-browser-screen.component";
import { SwiNewComponent } from "../swi-builder/components/swi-new/swi-new.component";
import { SwiHsPickerComponent } from "../swi-builder/components/swi-hs-picker/swi-hs-picker.component";
import { SwiToolEditComponent } from "../swi-builder/components/swi-tool-edit/swi-tool-edit.component";
import { SwiImporterScreenComponent } from "../swi-importer/components/swi-importer-screen/swi-importer-screen.component";
import { SwiViewerScreenComponent } from "../swi-viewer/components/swi-viewer-screen/swi-viewer-screen.component";
import { SwiManagerScreenComponent } from "../swi-manager/components/swi-manager-screen/swi-manager-screen.component";
import { StagesGalleryScreenComponent } from "../swi-viewer/components/stages-gallery-screen/stages-gallery-screen.component";
import { RepoSearchComponent } from "../swi-repo/components/repo-search/repo-search.component";
import {
  StdToolingSearchComponent,
  StdToolingFormComponent,
  SWIStandardToolResolver
} from "app/swi-standard-tooling";

//Resolvers
import { SWIsResolver, SWIResolver, HSItemsResolver } from "app/core";

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
  { path: 'repo/search', component: RepoSearchComponent },
  { path: 'repo/tooling/search', component: StdToolingSearchComponent },
  { path: 'repo/tooling/edit/:id', component: StdToolingFormComponent, resolve: { stdTool: SWIStandardToolResolver } },
  { path: 'repo/tooling/new', component: StdToolingFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }



