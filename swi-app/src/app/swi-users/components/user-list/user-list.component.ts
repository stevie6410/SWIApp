import { Component, OnInit } from '@angular/core';
import { UsersService, User } from "app/core";

@Component({
  selector: 'swi-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UsersService
  ) { }

  async ngOnInit() {
    await this.refreshData();
  }

  async refreshData() {
    // this.users = await this.userService.getByApplication('SWIAPP').toPromise();
  }
}
