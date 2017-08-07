import { Component, OnInit } from '@angular/core';
import { BrandImage } from "assets/image-placeholder";
import { SWIFileService, AuthService } from "app/core";
import { EnvironmentService } from "app/app/services/environment.service";

@Component({
  selector: 'swi-app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  brandImage: string = BrandImage;
  isCollapsed = true;
  isProduction = false;
  versionTag = "Loading...";
  buildNumber = "Loading...";

  constructor(
    private swiFileService: SWIFileService,
    private environment: EnvironmentService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const verTag = this.environment.getVersionTag();
    this.versionTag = verTag;
    this.isProduction = this.versionTag.startsWith("Production");
    this.buildNumber = this.environment.getEnvironmentProp('buildNumber');
    // tslint:disable-next-line:no-console
    console.info("App Version: ", this.environment.getAppVersion());
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
