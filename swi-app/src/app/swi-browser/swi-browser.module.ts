import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SwiBrowserScreenComponent } from './components/swi-browser-screen/swi-browser-screen.component';
import { SharedModule } from "../shared/shared.module";
import { ToastModule } from "ng2-toastr";
import { MomentModule } from "angular2-moment";
import { ProgressbarModule } from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    ToastModule.forRoot(),
    SharedModule,
    RouterModule,
    MomentModule,
    FormsModule,
    ProgressbarModule
  ],
  exports: [
    SwiBrowserScreenComponent
  ],
  declarations: [
    SwiBrowserScreenComponent
  ]
})
export class SwiBrowserModule { }
