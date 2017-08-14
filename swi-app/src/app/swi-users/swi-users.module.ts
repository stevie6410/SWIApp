import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { SharedModule } from "app/shared";
import { PrimengModule } from "app/primeng";
import { UserSearchScreenComponent } from './screens/user-search-screen/user-search-screen.component';
import {
  UserEditDialogComponent,
  UserCreateDialogComponent,
  UserSearchFilterComponent,
  UserSearchResultsComponent,
  RoleEditDialogComponent,
  RoleFormComponent,
  RoleListComponent,
  RolePickerComponent
} from "app/swi-users";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PrimengModule,
    FormsModule
  ],
  declarations: [
    UserEditDialogComponent,
    UserSearchFilterComponent,
    UserSearchResultsComponent,
    UserSearchScreenComponent,
    UserCreateDialogComponent,
    RoleEditDialogComponent,
    RoleFormComponent,
    RoleListComponent,
    RolePickerComponent
  ],
  exports: [
    UserEditDialogComponent,
    UserSearchFilterComponent,
    UserSearchResultsComponent,
    UserSearchScreenComponent,
    UserCreateDialogComponent,
    RoleEditDialogComponent,
    RoleFormComponent,
    RoleListComponent,
    RolePickerComponent
  ]
})
export class SwiUsersModule { }
