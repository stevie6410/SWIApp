import { Directive, HostListener, Input } from '@angular/core';
import { SWIHeader } from "../../../models/app.models";
import { saveAs } from 'file-saver';

@Directive({
  selector: '[swiExportButton]'
})
export class SWIExportButton {

  @Input() swi: SWIHeader;

  constructor() { }

  @HostListener('click') onClick() {
    this.downloadSWI();
  }

  downloadSWI() {
    if (this.swi) {
      var blob = new Blob([JSON.stringify(this.swi)], { type: "text/plain;charset=utf-8" });
      saveAs(blob, this.swi.title + '.swi');
    } else {
      console.error("Could not export SWI");
    }
  }

}
