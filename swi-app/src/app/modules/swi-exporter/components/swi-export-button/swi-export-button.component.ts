import { Component, OnInit, Input } from '@angular/core';
import { SWIHeader } from "../../../../../app/models/app.models";
import { saveAs } from 'file-saver';

@Component({
  selector: 'swi-export-button',
  template: `
  <button class="btn btn-lg btn-warning" (click)="downloadSWI()"><i class="fa fa-sign-out"></i> Export SWI </button>
  `,
  styles: ['./swi-export-button.component.scss']
})
export class SwiExportButtonComponent implements OnInit {

  @Input() swi: SWIHeader;

  constructor() { }

  ngOnInit() {
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
