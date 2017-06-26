import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiImporterScreenComponent } from './components/swi-importer-screen/swi-importer-screen.component';
import { SharedModule } from "../shared/shared.module";
import { ToastModule } from "ng2-toastr";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
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
