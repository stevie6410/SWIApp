import { Component } from '@angular/core';
import { } from '../../../package.json';
import { ElectronService } from '../../services/electron.service';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Standard Work Instructions!!';
  packageJson: any;

  constructor() {
    //Print app info to the console
    this.packageJson = require('../../../package.json');
    console.info("Name: ", this.packageJson.name);
    console.info("Description: ", this.packageJson.description);
    console.info("Author: ", this.packageJson.author);
    console.info("Version: ", this.packageJson.version);
  }
}
