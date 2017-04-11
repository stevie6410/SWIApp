import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { SWIHeader } from "../../../../models/app.models";
import { SWIFileService } from "../../../../services/swi-file.service";
import { ElectronService } from "../../../../services/electron.service";
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";

@Component({
  selector: 'swi-browser-screen',
  templateUrl: './swi-browser-screen.component.html',
  styleUrls: ['./swi-browser-screen.component.css']
})
export class SwiBrowserScreenComponent implements OnInit {

  title: string = "SWI Browser"
  localSWIs: SWIHeader[];
  newSWIName: string = "Enter new SWI name";

  constructor(
    private swiService: SWIFileService,
    private vcr: ViewContainerRef,
    private overlay: Overlay,
    public modal: Modal,
    private router: Router
  ) {
    this.overlay.defaultViewContainer = vcr;
  }

  ngOnInit() {
    this.swiService.getAllFiles().then((results: SWIHeader[]) => {
      this.localSWIs = results.sort(function (a, b) { return b.updatedOn.getTime() - a.updatedOn.getTime() });
      console.log(this.localSWIs);
    })
  }

  getImageFromKey(swi: SWIHeader, key: string): string {
    try {
      let result = swi.swiImages.filter(i => i.key == key)[0];
      if (result) return result.value;
    } catch (error) {
      return ImagePlaceholder;
    }
  }

  openSWI(swi: SWIHeader) {
    console.log(`filename: ${swi.filename}`);
    this.router.navigate(['swibuilder', swi.filename]);
  }

}
