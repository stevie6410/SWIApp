import { Directive, HostListener, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";

import { saveAs } from 'file-saver';
import { Modal } from "angular2-modal/plugins/bootstrap";
import { ToastsManager } from "ng2-toastr";
import { SWIHeader, SWIFileService, ImageStoreService, SWIDuplicateService } from "app/core";

@Directive({
  selector: '[swiDuplicateButton]'
})
export class SWIDuplicateButton {

  @Input() swi: SWIHeader;
  @Output() started = new EventEmitter<void>();
  @Output() completed = new EventEmitter<void>();
  newDupTitle: string;

  constructor(
    public modal: Modal,
    private swiFileService: SWIFileService,
    private toast: ToastsManager,
    private router: Router,
    private imageStore: ImageStoreService,
    private dupService: SWIDuplicateService
  ) { }

  @HostListener('click') onClick() {
    this.duplicateSWI();
  }

  private confirmDuplicate(): Promise<string> {
    this.newDupTitle = this.swi.title.toString();
    return new Promise<string>((resolve, reject) => {
      this.modal.confirm()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .titleHtml('<h5>Duplicate SWI - New Title</h5>')
        .body(`
          Are you sure you want to duplicate this SWI?
          `)
        .okBtn('Duplicate')
        .okBtnClass('btn btn-primary')
        .cancelBtn('Cancel')
        .cancelBtnClass('btn btn-secondary')
        .open()
        .then(dialogRef => dialogRef.result)
        .then(result => {
          resolve('Copy of ' + this.swi.title);
        })
        .catch(err => {
          console.log('Canceled');
          this.completed.emit();
        });
    });
  }

  async duplicateSWI() {
    var dialogResult = await this.confirmDuplicate();
    this.started.emit();
    let result = await this.dupService.duplicate(this.swi, dialogResult);
    console.log("SWI has been duplicated", result.id);
    this.router.navigate(['manager', result.id]);
    this.toast.success(result.title, "SWI has been duplicated");
    this.completed.emit();
  }

}
