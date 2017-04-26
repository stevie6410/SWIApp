import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from "ng2-toastr";
@Component({
  selector: 'swi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Standard Work Instructions';

  constructor(
    private toast: ToastsManager,
    vcr: ViewContainerRef
  ) {
    toast.setRootViewContainerRef(vcr);
  }
}
