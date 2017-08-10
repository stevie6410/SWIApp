import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { SharedModule } from "app/shared";
import { PrimengModule } from "app/primeng";
import {
  UserCreateFormComponent,
  UserEditDialogComponent,
  UserSearchFilterComponent,
  UserSearchResultsComponent
} from "app/swi-users";
import { UserSearchScreenComponent } from './screens/user-search-screen/user-search-screen.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PrimengModule,
    FormsModule
  ],
  declarations: [
    UserCreateFormComponent,
    UserEditDialogComponent,
    UserSearchFilterComponent,
    UserSearchResultsComponent,
    UserSearchScreenComponent
  ],
  exports: [
    UserCreateFormComponent,
    UserEditDialogComponent,
    UserSearchFilterComponent,
    UserSearchResultsComponent,
    UserSearchScreenComponent
  ]
})
export class SwiUsersModule { }
