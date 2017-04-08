import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SwiBrowserScreenComponent } from './components/swi-browser-screen/swi-browser-screen.component';
import { SharedControlsModule } from "../shared-controls/shared-controls.module";
import { ToastModule } from "ng2-toastr";


@NgModule({
  imports: [
    CommonModule,
    ToastModule.forRoot(),
    SharedControlsModule,
    RouterModule
  ],
  exports: [
    SwiBrowserScreenComponent
  ],
  declarations: [
    SwiBrowserScreenComponent
  ]
})
export class SwiBrowserModule { }
