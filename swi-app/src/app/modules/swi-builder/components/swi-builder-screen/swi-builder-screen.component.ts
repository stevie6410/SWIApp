import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  filename: string;
  pageTitle: string = "SWI Builder";

  constructor(
    private swiService: SWIFileService,
    private vcr: ViewContainerRef,
    private toast: ToastsManager,
    private route: ActivatedRoute
  ) {
    this.toast.setRootViewContainerRef(vcr);
    this.route.params.subscribe((params: Params) => {
      this.filename = params['filename'];
      this.pageTitle = `SWI Builder - ${this.filename}`;
      if (this.filename != undefined) {
        this.getFile(this.filename);
      } else {
        this.swi = new SWIHeader();
      }
    })
  }

  ngOnInit() {
  }

  getImageFromKey(key: string): string {
    return this.swi.swiImages.filter(i => i.key == key)[0].value;
  }

  createFile(filename: string) {
    this.swiService.saveFile(filename, this.swi)
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

  saveFile(swi: SWIHeader) {
    this.swiService.saveFile(this.filename, this.swi)
      .then((result) => {
        console.log(`${this.filename} was saved.`);
        this.toast.success(`${result} was saved`, `File Saved!`);
      }
      )
      .catch((err) => {
        console.log("Error saving file: ", err);
        this.toast.error(`${this.filename} could not be created`, "Error saving file!");
      })
  }

  getFile(filename: string) {
    this.isLoading = true;
    this.swiService.getFile(filename)
      .then(swi => {
        this.swi = swi as SWIHeader;
        if (this.swi.title && this.swi.revision) {
          console.log(swi);
          this.toast.success(`Loaded document ${this.swi.title}`, `SWI Loaded`);
        } else {
          this.toast.error(`Document is not a valid swi`, `Invalid File`);
        }
        this.isLoading = false;
      })
      .catch(err => {
        console.log('Error retreiving document: ', err);
        this.toast.error(`SWI was in a incorrect format`, `Error Loading SWI`);
        this.isLoading = false;
      });
  }

}
