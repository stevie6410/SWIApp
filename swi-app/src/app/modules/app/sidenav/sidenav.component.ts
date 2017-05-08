import { Component, OnInit } from '@angular/core';
import { SWIFileService } from "../../../services/swi-file.service";
import { BrandImage } from "../../../../assets/image-placeholder";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  brandImage: string = BrandImage;
  isCollapsed: boolean = true;

  constructor(
    private swiFileService: SWIFileService
  ) { }

  ngOnInit() {
  }
  
  toggleSidebar(){
    this.isCollapsed = !this.isCollapsed;
  }

}
