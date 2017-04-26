import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SwiBrowserScreenComponent } from './components/swi-browser-screen/swi-browser-screen.component';
import { SharedControlsModule } from "../shared-controls/shared-controls.module";
import { ToastModule } from "ng2-toastr";
import { MomentModule } from "angular2-moment";
import { SwiPropertiesPanelComponent } from './components/swi-properties-panel/swi-properties-panel.component';

@NgModule({
  imports: [
    CommonModule,
    ToastModule.forRoot(),
    SharedControlsModule,
    RouterModule,
    MomentModule,
    FormsModule
  ],
  exports: [
    SwiBrowserScreenComponent
  ],
  declarations: [
    SwiBrowserScreenComponent,
    SwiPropertiesPanelComponent
  ]
})
export class SwiBrowserModule { }
