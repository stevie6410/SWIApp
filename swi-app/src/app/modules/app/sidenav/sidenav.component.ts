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

  async ngOnInit() {

    let verTag = await this.packageService.getVersionTag();
    this.versionTag = verTag;
    this.isProduction = this.versionTag.startsWith("Production");
    this.buildNumber = await this.packageService.getEnvironmentProp('buildNumber');
    console.info("App Version: ", await this.packageService.getAppVersion());
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
