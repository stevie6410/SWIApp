import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from "ng2-toastr";
import { AppConfigService } from "../../services/repo-config.service";

@Component({
  selector: 'swi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Standard Work Instructions';

  constructor(
    private toast: ToastsManager,
    vcr: ViewContainerRef,
    private appConfigService: AppConfigService
  ) {
    toast.setRootViewContainerRef(vcr);

    //Make a call to the app config service to be sure that it is loaded and ready for the app
    this.appConfigService.getAppConfig().then(config => console.log("Loaded app config"));
  }
}
