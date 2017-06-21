import { Directive, HostListener, Input } from '@angular/core';
import { Router } from "@angular/router";

import { ToastsManager } from "ng2-toastr";
import { SWIHeader, SWIFileService, hasChanges } from "app/core";


@Directive({
  selector: '[swiSaveChanges]'
})
export class SaveChangesDirective {

  @Input() navBack: boolean = true;
  @Input() swi: SWIHeader;
  @Input() initialState: number;

  constructor(
    private router: Router,
    private toast: ToastsManager,
    private swiService: SWIFileService
  ) { }

  @HostListener('click') onClick() {
    this.save(this.navBack);
  }

  save(navBack: Boolean) {
    if (!hasChanges(this.swi, this.initialState)) {
      console.log("No changes");
      this.toast.success(`File Saved!`);
      if (navBack) this.navigateBack();
    } else {
      console.log("Changes in directive");
      //Save the file and navigate back to the SWI Builder screen
      this.swiService.update(this.swi)
        .then((result) => {
          console.log(`${this.swi.id} was saved.`);
          this.toast.success(`File Saved!`);
          if (navBack) this.navigateBack();
        })
        .catch((err) => {
          console.log("Error saving file: ", err);
          this.toast.error(`${this.swi.title} could not be created`, "Error saving file!");
        });
    }
  }

  navigateBack() {
    this.router.navigate(['builder', this.swi.id]);
  }
}
