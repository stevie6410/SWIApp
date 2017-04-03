import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SWIFileService } from '../../../../services/swi-file.service';
import { ToastsManager } from 'ng2-toastr';

import { SWIHeader } from '../../../../models/app.models';

@Component({
  selector: 'swi-builder-screen',
  templateUrl: './swi-builder-screen.component.html',
  styleUrls: ['./swi-builder-screen.component.css']
})
export class SwiBuilderScreenComponent implements OnInit {

  isLoading: boolean = false;
  swi: SWIHeader;

  constructor(
    private swiService: SWIFileService,
    private vcr: ViewContainerRef,
    private toast: ToastsManager
  ) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    //Check to see if we have an id

  }

  createFile(filename: string) {
    this.swiService.saveFile(filename)
      .then((result) => {
        console.log(`${result} was created`, `File Saved!`);
        this.toast.success(`${result} was saved`, `File Saved!`);
      })
      .catch((err) => {
        console.log("Error saving file: ", err);
        this.toast.error(`${filename} could not be created`, "Error saving file!");
      });
  }

  openLocalDocsDir() {
    this.swiService.openLocalDocumentsDirectory();
  }

  getFile(filename: string) {
    this.isLoading = true;
    this.swiService.getFile(filename)
      .then(swi => {
        this.swi = swi;
        console.log(swi);
        this.isLoading = false;
      })
      .catch(err => {
        console.log('Error retreiving document: ', err);
        this.isLoading = false;
      });
  }

}
