import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiImporterScreenComponent } from './components/swi-importer-screen/swi-importer-screen.component';
import { SharedControlsModule } from "../shared-controls/shared-controls.module";
import { ToastModule } from "ng2-toastr";

@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule,
    ToastModule
  ],
  declarations: [
    SwiImporterScreenComponent
  ],
  exports: [
    SwiImporterScreenComponent
  ]
})
export class SwiImporterModule { }
