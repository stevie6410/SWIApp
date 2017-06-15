import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { SWIHeader } from "../../../models/app.models";
import { saveAs } from 'file-saver';
import { ImageStoreService } from "../../../services/image-store.service";
// const semver = require("semver");

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
      //Check to see if we need to do a legacy export
      if (!this.swi.appVersion && this.swi.swiImages.length > 0) {
        console.log("Exporting in LEGACY mode");
        //Export the swi raw (LEGACY OPTION!)
        var blob = new Blob([JSON.stringify(this.swi)], { type: "text/plain;charset=utf-8" });
        saveAs(blob, this.swi.title + '.swi');
        this.exportCompelte.emit();
        return;
      }

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
