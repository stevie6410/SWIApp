import { Directive, HostListener, Input, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";

import { ToastsManager } from "ng2-toastr";
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";

import { SWIFileService } from "../../../../services/swi-file.service";
import { hasChanges, SWIHeader } from "../../../../models/app.models";

@Directive({
  selector: '[swiDiscardChanges]'
})
export class DiscardChangesDirective {

  @Input() navBack: boolean = true;
  @Input() swi: SWIHeader;
  @Input() initialState: number;

  constructor(
    private router: Router,
    private toast: ToastsManager,
    private swiService: SWIFileService,
    public overlay: Overlay,
    public modal: Modal,
    private vcr: ViewContainerRef,
  ) {
    overlay.defaultViewContainer = vcr;
  }

  @HostListener('click') onClick() {
    this.cancelChanges();
  }

  cancelChanges() {
    if (hasChanges(this.swi, this.initialState)) {
      this.modal.confirm()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .titleHtml('<h5>Cancel Changes</h5>')
        .body(`
          Are you sure you want to return to the SWI without saving?
          `)
        .okBtn('Return to SWI')
        .okBtnClass('btn btn-primary')
        .cancelBtn('Cancel')
        .cancelBtnClass('btn btn-secondary')
        .open()
        .then(dialogRef => dialogRef.result)
        .then(result => {
          this.navigateBack();
        })
        .catch(err => console.log('Canceled'));
    } else {
      this.navigateBack();
    }
  }
  navigateBack() {
    this.router.navigate(['builder', this.swi.id]);
  }
}
