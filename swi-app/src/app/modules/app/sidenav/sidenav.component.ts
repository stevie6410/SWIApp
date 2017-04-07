import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../services/electron.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
    private electron: ElectronService
  ) { }

  ngOnInit() {
  }

  toggleKioskMode() {
    this.electron.toggleKiosk();
  }

  quitApp() {
    this.electron.quitApp();
  }

  toggleDevTools() {
    this.electron.toggleDeveloperTools();
  }

}
