import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiViewerScreenComponent } from './components/swi-viewer-screen/swi-viewer-screen.component';
import { SharedControlsModule } from "../../modules/shared-controls/shared-controls.module";

@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule
  ],
  exports: [
    SwiViewerScreenComponent
  ],
  declarations: [
    SwiViewerScreenComponent
  ]
})
export class SwiViewerModule { }
