import { Component } from '@angular/core';
import { remote } from 'electron';
import { } from '../../../package.json';
import { ElectronKioskService } from '../../services/electron-kiosk.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Standard Work Instructions!!';
  packageJson: any;
  autoUpdater: Electron.AutoUpdater;

  constructor(
    private kiosk: ElectronKioskService
  ) {
    //Print app info to the console
    this.packageJson = require('../../../package.json');
    console.info("Name: ", this.packageJson.name);
    console.info("Description: ", this.packageJson.description);
    console.info("Author: ", this.packageJson.author);
    console.info("Version: ", this.packageJson.version);
  }

  toggleKioskMode() {
    this.kiosk.toggleKiosk();
  }

  get isKioskMode(): boolean {
    return this.kiosk.isKioskMode();
  }

}

