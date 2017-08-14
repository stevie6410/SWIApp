import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiViewerScreenComponent } from './components/swi-viewer-screen/swi-viewer-screen.component';
import { SharedModule } from "../shared/shared.module";
import { MomentModule } from "angular2-moment";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MomentModule
  ],
  exports: [
    SwiViewerScreenComponent
  ],
  declarations: [
    SwiViewerScreenComponent
  ]
})
export class SwiViewerModule { }
