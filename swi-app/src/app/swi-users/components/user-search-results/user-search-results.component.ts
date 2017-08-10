import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from "@angular/router";

import { User, CreateUser } from "app/core";
import { UserEditDialogComponent } from "../user-edit-dialog/user-edit-dialog.component";

@Component({
  selector: 'swi-user-search-results',
  templateUrl: './user-search-results.component.html',
  styleUrls: ['./user-search-results.component.scss']
})
export class UserSearchResultsComponent implements OnInit {

  @Input() users: User[];
  @ViewChild("userEditDialog") userEditDialog: UserEditDialogComponent;
  selectedUser: User;
  loading: boolean = false;
  title: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // this.title = `Results ${this.users.length}`;
  }

  edit(user: User) {
    this.router.navigate(['users', user.username]);
  }

  onRowDblClick(user: User) {
    console.log("event", event);
    if (user) {
      // this.router.navigate(["settings", "security", "users", user.username]);
    }
  }

  onUserAdded(user: User) {
    // navigate to the edit screen
    // this.router.navigate(["settings", "security", "users", user.username]);
  }

  showEditUserDialog() {
    this.userEditDialog.show();
    this.userEditDialog.user = new CreateUser();
  }
}
