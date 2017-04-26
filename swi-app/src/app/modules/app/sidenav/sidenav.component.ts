import { Component, OnInit } from '@angular/core';
import { SWIFileService } from "../../../services/swi-file.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
    private swiFileService: SWIFileService
  ) { }

  ngOnInit() {
  }

  toggleKioskMode() {
    // this.electron.toggleKiosk();
  }

  quitApp() {
    // this.electron.quitApp();
  }

  toggleDevTools() {
    // this.electron.toggleDeveloperTools();
  }

  openAppData() {
    // this.swiFileService.openLocalDocumentsDirectory();
  }

}
