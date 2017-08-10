import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";

import { User, CreateUser } from "app/core";
import { UserEditDialogComponent } from "../user-edit-dialog/user-edit-dialog.component";
import { UserCreateDialogComponent } from "app/swi-users";
import { MenuItem } from "primeng/primeng";

@Component({
  selector: 'swi-user-search-results',
  templateUrl: './user-search-results.component.html',
  styleUrls: ['./user-search-results.component.scss']
})
export class UserSearchResultsComponent implements OnInit {

  @Input() users: User[];
  selectedUser: User;
  loading = false;
  title: string;
  menuItems: MenuItem[] = [];

  @Output() userSelected = new EventEmitter<User>();
  @Output() requestDelete = new EventEmitter<User>();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.menuItems = [
      { label: 'Edit', icon: 'fa-pencil', command: (event) => this.userSelected.emit(this.selectedUser) },
      { label: 'Delete', icon: 'fa-trash', command: (event) => this.requestDelete.emit(this.selectedUser) }
    ];
  }
}
