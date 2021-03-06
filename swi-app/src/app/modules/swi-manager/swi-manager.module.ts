import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { SwiManagerScreenComponent } from './components/swi-manager-screen/swi-manager-screen.component';
import { SharedControlsModule } from "../../modules/shared-controls/shared-controls.module";
import { RouterModule } from "@angular/router";
import { SWIExportButton } from "./directives/swi-export.directive";

@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    SwiManagerScreenComponent,
    SWIExportButton
  ],
  declarations: [
    SwiManagerScreenComponent,
    SWIExportButton
  ]
})
export class SwiManagerModule { }
