import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from "ng2-toastr";
import { AppCatalogservice } from "../../services/app-catalog.service";

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
    private appCatalog: AppCatalogservice
  ) {
    toast.setRootViewContainerRef(vcr);

    //Make a call to the app config service to be sure that it is loaded and ready for the app
    this.appCatalog.updateCatalog().then(catalog => {
      console.info("App Catalog Loaded");
      this.appCatalog.getCatalog().then(cat => console.info("App Catalog: ", cat));
    });
  }
}
