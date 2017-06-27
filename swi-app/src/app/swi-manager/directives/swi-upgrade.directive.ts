import { Directive, HostListener, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";

import { saveAs } from 'file-saver';
import { Modal } from "angular2-modal/plugins/bootstrap";
import { ToastsManager } from "ng2-toastr";
import { SWIHeader, SWIFileService, ImageStoreService, SWIDuplicateService, SwiUpgradeService } from "app/core";
import { EnvironmentService } from "app/app/services/environment.service";

@Directive({
  selector: '[swiUpgrade]'
})
export class SWIUpgradeDirective {

  @Input() swi: SWIHeader;
  @Output() started = new EventEmitter<void>();
  @Output() completed = new EventEmitter<void>();

  constructor(
    public modal: Modal,
    private swiFileService: SWIFileService,
    private toast: ToastsManager,
    private router: Router,
    private imageStore: ImageStoreService,
    private dupService: SWIDuplicateService,
    private environment: EnvironmentService,
    private upgradeService: SwiUpgradeService
  ) { }

  @HostListener('click') onClick() {
    this.upgrade();
  }

  private confirmUpgrade(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.modal.confirm()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .titleHtml('<h5>Upgrade SWI - New Title</h5>')
        .body(`
          Are you sure you want to upgrade this SWI to ${this.environment.env.version}?
          `)
        .okBtn('Upgrade')
        .okBtnClass('btn btn-primary')
        .cancelBtn('Cancel')
        .cancelBtnClass('btn btn-secondary')
        .open()
        .then(dialogRef => dialogRef.result)
        .then(result => {
          resolve();
        })
        .catch(err => {
          console.log('Canceled');
          reject();
          this.completed.emit();
        });
    });
  }

  async upgrade() {
    await this.confirmUpgrade();
    this.started.emit();

    let upgradeRequired = this.upgradeService.upgradeRequired(this.swi);
    if (!upgradeRequired) {
      console.log("Upgrade not required");
      this.toast.info("SWI upgrade is not required");
    } else {
      this.swi = await this.upgradeService.upgrade(this.swi);
      console.log("Upgrading SWI");
      this.toast.success("SWI has been upgraded");
    }

    this.completed.emit();
  }

}
