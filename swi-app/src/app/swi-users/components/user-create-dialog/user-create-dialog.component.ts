import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService, CreateUser, User, Application, ApplicationsService, Company, CompaniesService } from "app/core";
import { SelectItem } from "primeng/primeng";

@Component({
  selector: 'swi-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.scss']
})
export class UserCreateDialogComponent implements OnInit {

  @Input() user: CreateUser;
  @Output() onSaved = new EventEmitter<User>();
  companies: Company[];
  companyOptions: SelectItem[];
  visible = false;
  password: string;

  constructor(
    private userService: UsersService,
    private appService: ApplicationsService,
    private companyService: CompaniesService
  ) { }

  ngOnInit() {
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  async save() {
    // Create the user
    const newUser = await this.userService.create(this.user).toPromise();
    // Get the appid for the "SWIAPP"
    const apps: Application[] = await this.appService.getAll().toPromise();
    const appId: number = apps.find(a => a.appId === "SWIAPP").id;
    console.log("AppID", appId);
    const appResult = await this.userService.addApplication(newUser.username, appId).toPromise();
    console.log("AppResult", appResult);
    console.log(`Application SWIApp added to user ${newUser.firstName} ${newUser.lastName}`);

    this.onSaved.emit(newUser);
    this.hide();
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

  delete() {

  }

}
