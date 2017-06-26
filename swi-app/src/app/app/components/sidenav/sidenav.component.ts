import { Component, OnInit } from '@angular/core';
import { BrandImage } from "assets/image-placeholder";
import { SWIFileService } from "app/core";
import { EnvironmentService } from "app/app/services/environment.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  brandImage: string = BrandImage;
  isCollapsed: boolean = true;
  isProduction: boolean = false;
  versionTag: string = "Loading...";
  buildNumber: string = "Loading...";

  constructor(
    private swiFileService: SWIFileService,
    private environment: EnvironmentService
  ) { }

  ngOnInit() {
    let verTag = this.environment.getVersionTag();
    this.versionTag = verTag;
    this.isProduction = this.versionTag.startsWith("Production");
    this.buildNumber = this.environment.getEnvironmentProp('buildNumber');
    console.info("App Version: ", this.environment.getAppVersion());
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
