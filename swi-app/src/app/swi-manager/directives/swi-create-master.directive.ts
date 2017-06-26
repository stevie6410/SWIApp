import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

import { Modal } from "angular2-modal/plugins/bootstrap";
import { ToastsManager } from "ng2-toastr";

import { SWIHeader, SWIFileService } from "app/core";

@Directive({
    selector: '[swiCreateMasterButton]'
})
export class SWICreateMasterButton {

    @Input() swi: SWIHeader;

    constructor(
        public modal: Modal,
        private swiFileService: SWIFileService,
        private toast: ToastsManager,
        private router: Router
    ) { }

    @HostListener('click') onClick() {
        this.deleteSWI();
    }

    deleteSWI() {
        this.modal.confirm()
            .size('lg')
            .isBlocking(true)
            .showClose(false)
            .keyboard(27)
            .titleHtml('<h5>Confirm Delete SWI</h5>')
            .body(`Are you sure you want to delete this SWI?`)
            .okBtn('Delete Stage')
            .okBtnClass('btn btn-danger')
            .cancelBtn('Cancel')
            .cancelBtnClass('btn btn-secondary')
            .open()
            .then(dialogRef => dialogRef.result)
            .then(result => {
                //Delete logic goes here
                this.swiFileService.deleteSWI(this.swi.id).then((() => {
                    this.toast.warning(this.swi.title + ' was deleted!', "Successfully Deleted");
                    this.router.navigate(['browser']);
                })).catch((err) => {
                    this.toast.error("Could not delete the SWI", "Delete failed");
                });
            })
            .catch(err => console.log('Canceled'));
    }

}


