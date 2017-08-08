import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import { SharedModule } from "app/shared";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    UserFormComponent,
    UserListComponent,
    UserEditDialogComponent
  ],
  exports: [
    UserFormComponent,
    UserListComponent,
    UserEditDialogComponent
  ]
})
export class SwiUsersModule { }
