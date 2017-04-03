import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SWIFileService } from '../../../../services/swi-file.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'swi-builder-screen',
  templateUrl: './swi-builder-screen.component.html',
  styleUrls: ['./swi-builder-screen.component.css']
})
export class SwiBuilderScreenComponent implements OnInit {

  constructor(
    private swiService: SWIFileService,
    private vcr: ViewContainerRef,
    private toast: ToastsManager
  ) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
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

  openLocalDocsDir(){
    this.swiService.openLocalDocumentsDirectory();
  }

}
