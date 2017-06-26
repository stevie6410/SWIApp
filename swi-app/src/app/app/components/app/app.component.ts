import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from "ng2-toastr";
import { AppCatalogService } from "app/core";
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";

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
    private appCatalog: AppCatalogService,
    public modal: Modal,
    public overlay: Overlay
  ) {
    toast.setRootViewContainerRef(vcr);
    overlay.defaultViewContainer = vcr;

    //Make a call to the app config service to be sure that it is loaded and ready for the app
    this.appCatalog.updateCatalog().then(catalog => {
      // console.info("App Catalog Loaded");
    });
  }
}
