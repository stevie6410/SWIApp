import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { SWIHeader } from "../../../models/app.models";
import { saveAs } from 'file-saver';
import { ImageStoreService } from "../../../services/image-store.service";

@Directive({
  selector: '[swiExportButton]'
})
export class SWIExportButton {

  @Input() swi: SWIHeader;
  @Output() exportStarted = new EventEmitter<void>();
  @Output() exportCompelte = new EventEmitter<void>();

  constructor(
    private imageStore: ImageStoreService
  ) { }

  @HostListener('click') onClick() {
    this.downloadSWI();
  }

  downloadSWI() {
    this.exportStarted.emit();
    if (this.swi) {
      //Embed the images into the swi
      this.imageStore.emmbedImagesIntoSWI(this.swi).then(swi => {
        this.swi = swi
        var blob = new Blob([JSON.stringify(this.swi)], { type: "text/plain;charset=utf-8" });
        saveAs(blob, this.swi.title + '.swi');
        this.exportCompelte.emit();
      });
    } else {
      console.error("Could not export SWI");
    }
  }

}
