import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserSearchFilter, Company, UsersService, CompaniesService, CreateUser } from "app/core";
import { SelectItem } from "primeng/primeng";
import { UserEditDialogComponent, UserCreateDialogComponent } from "app/swi-users";

@Component({
  selector: 'swi-user-search-screen',
  templateUrl: './user-search-screen.component.html',
  styleUrls: ['./user-search-screen.component.scss']
})
export class UserSearchScreenComponent implements OnInit {

  users: User[];
  selectedUser: User;
  filter: UserSearchFilter = new UserSearchFilter();
  title: string;
  companies: Company[];
  companyOptions: SelectItem[];
  @ViewChild("userEditDialog") userEditDialog: UserEditDialogComponent;
  @ViewChild("userCreateDialog") userCreateDialog: UserCreateDialogComponent;

  constructor(
    private userService: UsersService,
    private companyService: CompaniesService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.getCompanies();
  }

  async loadUsers() {
    this.users = await this.userService.search(this.filter).toPromise();
  }

  async getCompanies() {
    this.companies = await this.companyService.getAll().toPromise();
    this.companyOptions = [];
    const options = this.companies.map(c => {
      return {
        label: c.name,
        value: c.id
      };
    });
    options.push({ label: 'All', value: null });
    options.forEach(o => this.companyOptions.push(o));
  }

  selectUser(user: User) {
    console.log("Selected user", user);
    this.selectedUser = user;
    this.showEditDialog();
  }

  deleteUser(user: User) {

  }

  showCreateDialog() {
    this.userCreateDialog.show();
    this.userCreateDialog.user = new CreateUser();
  }

  showEditDialog() {
    this.userEditDialog.show();
    this.userEditDialog.user = this.selectedUser;
  }


}
