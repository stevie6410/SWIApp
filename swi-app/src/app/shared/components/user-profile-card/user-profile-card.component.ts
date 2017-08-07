import { Component, OnInit } from '@angular/core';
import { AuthUser, AuthService } from "app/core";

@Component({
  selector: 'swi-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit {

  user: AuthUser;

  constructor(
    public authService: AuthService
  ) {
    this.user = this.authService.loggedInUser;
    console.log("User: ", this.authService.loggedInUser);
  }

  ngOnInit() {
  }

}
