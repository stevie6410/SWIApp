import { Component, OnInit } from '@angular/core';
import { ElectronKioskService } from '../../../services/electron-kiosk.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
    private kioskService: ElectronKioskService
  ) { }

  ngOnInit() {
  }

  toggleKioskMode() {
    this.kioskService.toggleKiosk();
  }

}
