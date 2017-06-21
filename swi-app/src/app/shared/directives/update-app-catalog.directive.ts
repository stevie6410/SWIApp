import { Directive, HostListener } from '@angular/core';
import { AppCatalogService } from "app/core";

@Directive({
  selector: '[swiUpdateAppCatalog]'
})
export class UpdateAppCatalogDirective {

  constructor(
    appCatalog: AppCatalogService
  ) { 
  }

  @HostListener('click') onClick() {

  }
}
