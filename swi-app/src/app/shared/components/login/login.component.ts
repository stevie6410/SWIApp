import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/core";
import { BrandImage } from "assets/image-placeholder";
import { Router, ActivatedRoute } from "@angular/router";

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
  returnURL: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.returnURL = this.route.snapshot.queryParams['returnURL'] || '/browser';
  }

  login() {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(
      token => {
        this.router.navigateByUrl(this.returnURL);
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.errorMessage = err.json().message;
      }
    );
  }
}
