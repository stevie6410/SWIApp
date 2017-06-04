import { Component, OnInit } from '@angular/core';
import { SWIFileService } from "../../../services/swi-file.service";
import { BrandImage } from "../../../../assets/image-placeholder";
import { PackageService } from "../../../services/package.service";

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
    private packageService: PackageService
  ) { }

  ngOnInit() {
    this.packageService.getVersionTag().then(res => {
      this.versionTag = res
      this.isProduction = this.versionTag.startsWith("Production");
      this.packageService.getEnvironmentProp('buildNumber').then(res => this.buildNumber = res);
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
