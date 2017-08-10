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
  TriStateCheckboxModule,
  ContextMenuModule
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
    TriStateCheckboxModule,
    ContextMenuModule
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
    TriStateCheckboxModule,
    ContextMenuModule
  ],
  declarations: []
})
export class PrimengModule { }
