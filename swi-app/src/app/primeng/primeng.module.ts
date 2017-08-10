import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProgressBarModule,
  DropdownModule,
  InputTextModule,
  CheckboxModule,
  DataTableModule,
  SharedModule,
  PanelModule,
  ButtonModule,
  SplitButtonModule,
  DialogModule,
  PasswordModule,
  TriStateCheckboxModule
} from "primeng/primeng";

@NgModule({
  imports: [
    ProgressBarModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    ButtonModule,
    SplitButtonModule,
    DialogModule,
    PasswordModule,
    TriStateCheckboxModule
  ],
  exports: [
    ProgressBarModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    ButtonModule,
    SplitButtonModule,
    DialogModule,
    PasswordModule,
    TriStateCheckboxModule
  ],
  declarations: []
})
export class PrimengModule { }
