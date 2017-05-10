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
  versionTag: string;
  buildNumber: string;

  constructor(
    private swiFileService: SWIFileService,
    private packageService: PackageService
  ) { }

  ngOnInit() {
    this.versionTag = this.packageService.getVersionTag();
    this.buildNumber = this.packageService.getBuildNumber();
  }
  
  toggleSidebar(){
    this.isCollapsed = !this.isCollapsed;
  }
}
