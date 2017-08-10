import { Component, OnInit, Input } from '@angular/core';
import { CreateUser, Company, CompaniesService } from "app/core";
import { SelectItem } from "primeng/primeng";

@Component({
  selector: 'swi-user-create-form',
  templateUrl: './user-create-form.component.html',
  styleUrls: ['./user-create-form.component.scss']
})
export class UserCreateFormComponent implements OnInit {

  @Input() user: CreateUser;
  companies: Company[];
  companyOptions: SelectItem[];


  constructor(
    private companyService: CompaniesService
  ) {
    this.getCompanies();
  }

  ngOnInit() {
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
    options.forEach(o => this.companyOptions.push(o));
  }


}
