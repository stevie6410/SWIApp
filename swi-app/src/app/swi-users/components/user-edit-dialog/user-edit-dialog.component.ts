import { Component, OnInit, Input } from '@angular/core';
import { User, Company, CompaniesService } from "app/core";
import { SelectItem } from "primeng/primeng";

@Component({
  selector: 'swi-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  @Input() user: User;
  visible = false;
  companies: Company[];
  companyOptions: SelectItem[];

  constructor(
    private companyService: CompaniesService
  ) { }

  ngOnInit() {
    this.getCompanies();
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  save() {

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
