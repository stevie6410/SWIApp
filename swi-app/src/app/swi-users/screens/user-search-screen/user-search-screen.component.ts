import { Component, OnInit } from '@angular/core';
import { User, UserSearchFilter, Company, UsersService, CompaniesService } from "app/core";
import { SelectItem } from "primeng/primeng";

@Component({
  selector: 'swi-user-search-screen',
  templateUrl: './user-search-screen.component.html',
  styleUrls: ['./user-search-screen.component.scss']
})
export class UserSearchScreenComponent implements OnInit {

   users: User[];
  filter: UserSearchFilter = new UserSearchFilter();
  title: string;
  companies: Company[];
  companyOptions: SelectItem[];

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


}
