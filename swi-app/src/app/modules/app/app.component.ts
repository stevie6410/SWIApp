import { Component, ViewContainerRef } from '@angular/core';
import { } from '../../../package.json';
import { ElectronService } from '../../services/electron.service';
import { ElectronUpdateService } from "../../services/electron-update.service";
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Standard Work Instructions!';
  packageJson: any;

  constructor(
    private updateService: ElectronUpdateService,
    private vcr: ViewContainerRef,
    private toast: ToastsManager
  ) {
    //Print app info to the console
    this.packageJson = require('../../../package.json');

    this.updateService.updateAvailable.subscribe((release: string) => {
      this.toast.info(`
      ${release} has been downloaded and is ready to be installed. 
      Please restart the application to complete the update.`, "New version ready!", {
          dismiss: "click"
        });
    });

    this.updateService.isLatestVersion.subscribe(() => {
      this.toast.success(`v${this.packageJson.version} is the most recent version`, `Up to date`, { dismiss: "auto" });
    });

    this.updateService.configureAutoUpdate();

    this.toast.setRootViewContainerRef(vcr);


    console.info("Name: ", this.packageJson.name);
    console.info("Description: ", this.packageJson.description);
    console.info("Author: ", this.packageJson.author);
    console.info("Version: ", this.packageJson.version);
  }
}
