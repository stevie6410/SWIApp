import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiViewerScreenComponent } from './components/swi-viewer-screen/swi-viewer-screen.component';
import { SharedControlsModule } from "../../modules/shared-controls/shared-controls.module";
import { MomentModule } from "angular2-moment";

@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule,
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
