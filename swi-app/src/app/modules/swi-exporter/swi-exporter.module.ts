import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiExportButtonComponent } from './components/swi-export-button/swi-export-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SwiExportButtonComponent
  ],
  declarations: [SwiExportButtonComponent]
})
export class SwiExporterModule { }
