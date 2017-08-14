import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
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
  ContextMenuModule,
  ConfirmDialogModule
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
    ContextMenuModule,
    ConfirmDialogModule,
    FormsModule
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
    ContextMenuModule,
    ConfirmDialogModule
  ],
  declarations: []
})
export class PrimengModule { }
