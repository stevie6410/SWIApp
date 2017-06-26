import { Directive, HostListener } from '@angular/core';
import { AppCatalogService } from "app/core";
import { ToastsManager } from "ng2-toastr";

@Directive({
  selector: '[swiUpdateAppCatalog]'
})
export class UpdateAppCatalogDirective {

  constructor(
    private appCatalog: AppCatalogService,
    private toast: ToastsManager
  ) {
  }

  @HostListener('click') onClick() {
    this.UpdateCatalog();
  }

  public async UpdateCatalog() {

    let updateNeeded = await this.appCatalog.updateRequired();
    if (updateNeeded) {
      await this.appCatalog.updateCatalog();
      this.toast.success("App Catalog has been updated!");
    } else {
      this.toast.info("App Catalog is up to date!");
    }
  }

}
