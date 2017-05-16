import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiManagerScreenComponent } from './components/swi-manager-screen/swi-manager-screen.component';
import { SharedControlsModule } from "../../modules/shared-controls/shared-controls.module";
import { RouterModule } from "@angular/router";
import { SwiExporterModule } from "../../modules/swi-exporter/swi-exporter.module";

@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule,
    RouterModule,
    SwiExporterModule
  ],
  exports: [
    SwiManagerScreenComponent
  ],
  declarations: [
    SwiManagerScreenComponent
  ]
})
export class SwiManagerModule { }
