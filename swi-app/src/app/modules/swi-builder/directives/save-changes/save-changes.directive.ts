import { Directive, HostListener, Input } from '@angular/core';
import { Router } from "@angular/router";

import { ToastsManager } from "ng2-toastr";

import { SWIFileService } from "../../../../services/swi-file.service";
import { hasChanges, SWIHeader } from "../../../../models/app.models";

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
      if (navBack) this.navigateBack();
    } else {
      //Save the file and navigate back to the SWI Builder screen
      this.swiService.saveFile(this.swi)
        .then((result) => {
          this.toast.success(`${this.swi.title} was saved`, `File Saved!`);
          console.log(`${this.swi.id} was saved.`);
          if (navBack) this.navigateBack();
        })
        .catch((err) => {
          console.log("Error saving file: ", err);
          this.toast.error(`${this.swi.title} could not be created`, "Error saving file!");
        })
    }
  }

  navigateBack() {
    this.router.navigate(['builder', this.swi.id]);
  }
}
