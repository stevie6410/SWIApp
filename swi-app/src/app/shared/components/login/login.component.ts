import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/core";
import { BrandImage } from "assets/image-placeholder";
import { Router } from "@angular/router";

@Component({
  selector: "swi-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage: string;
  brandImage: string = BrandImage;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(
      token => {
        this.loading = false;
        // console.log("token", token);
      },
      err => {
        this.loading = false;
        this.errorMessage = err.json().message;
      }
    );
  }
}
