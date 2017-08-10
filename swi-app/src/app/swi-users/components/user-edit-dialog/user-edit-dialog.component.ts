import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService, CreateUser, User, Application, ApplicationsService } from "app/core";

@Component({
  selector: 'swi-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  @Input() user: CreateUser;
  @Output() onSaved = new EventEmitter<User>();
  visible = false;
  password: string;

  constructor(
    private userService: UsersService,
    private appService: ApplicationsService
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

  delete() {

  }

}
