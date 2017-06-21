import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiViewerScreenComponent } from './components/swi-viewer-screen/swi-viewer-screen.component';
import { SharedModule } from "../shared/shared.module";
import { MomentModule } from "angular2-moment";
import { StagesGalleryScreenComponent } from './components/stages-gallery-screen/stages-gallery-screen.component';
import { DisplacerComponent, DisplacerPortalDirective } from "./components/stages-gallery-control/stages-gallery-displacer.component";
import { StagesGalleryControlComponent } from "./components/stages-gallery-control/stages-gallery-control.component";
import { MaterialModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MomentModule,
    MaterialModule
  ],
  exports: [
    SwiViewerScreenComponent,
    StagesGalleryScreenComponent
  ],
  declarations: [
    SwiViewerScreenComponent,
    StagesGalleryScreenComponent,
    DisplacerComponent,
    DisplacerPortalDirective,
    StagesGalleryControlComponent
  ]
})
export class SwiViewerModule { }
