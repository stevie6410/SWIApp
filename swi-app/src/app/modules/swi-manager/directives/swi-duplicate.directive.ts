import { Directive, HostListener, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { SWIHeader, GUID } from "../../../models/app.models";
import { saveAs } from 'file-saver';
import { ImageStoreService } from "../../../services/image-store.service";
import { SWIFileService } from "../../../services/swi-file.service";
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { ToastsManager } from "ng2-toastr";
import { SWIDuplicateService } from "../../../services/swi-duplicate.service";

@Directive({
  selector: '[swiDuplicateButton]'
})
export class SWIDuplicateButton {

  @Input() swi: SWIHeader;
  @Output() started = new EventEmitter<void>();
  @Output() completed = new EventEmitter<void>();
  newDupTitle: string;

  constructor(
    public overlay: Overlay,
    public vcr: ViewContainerRef,
    public modal: Modal,
    private swiFileService: SWIFileService,
    private toast: ToastsManager,
    private router: Router,
    private imageStore: ImageStoreService,
    private dupService: SWIDuplicateService
  ) {
    overlay.defaultViewContainer = vcr;
  }

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

  // async duplicateSWI() {
  //   console.log("Orignial SWI Id:", this.swi.id);
  //   var result = await this.confirmDuplicate();
  //   this.started.emit();
  //   //Get a copy of the current SWI and change the ID
  //   let newSWI: SWIHeader = JSON.parse(JSON.stringify(this.swi));
  //   newSWI.id = new GUID().value;
  //   newSWI.swiMaster = null;
  //   newSWI.swiRevisionId = null;
  //   newSWI.title = result;

  //   console.log("New SWI Id:", newSWI.id);
  //   await this.swiFileService.createSWI(newSWI);
  //   let tempSWIWithImages = await this.imageStore.emmbedImagesIntoSWI(this.swi);
  //   console.log("TempSWI with images:", tempSWIWithImages);
  //   await this.imageStore.addSWI(tempSWIWithImages, newSWI.id, false);

  //   console.log("SWI has been duplicated", newSWI.id);
  //   this.router.navigate(['manager', newSWI.id]);
  //   this.toast.success(newSWI.title, "SWI has been duplicated");
  //   this.completed.emit();
  // }

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
