import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

import { SWIFileService } from '../../../../services/swi-file.service';
import { SWIHeader } from '../../../../models/app.models';

@Component({
  selector: 'swi-builder-screen',
  templateUrl: './swi-builder-screen.component.html',
  styleUrls: ['./swi-builder-screen.component.css']
})
export class SwiBuilderScreenComponent implements OnInit, OnDestroy {

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
      this.filename = this.checkExtention(params['filename']);
      console.log(`paramfilename: ${params['filename']}`);
      console.log(`filename: ${this.filename}`);     

      this.getFile(this.filename);
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.saveFile();
  }

  checkExtention(filename: string) {
    if (!filename.endsWith('.swi')) {
      return filename + '.swi'
    } else {
      return filename;
    }
  }
  
  getFile(filename: string) {
    console.log(`getFile: ${filename}`);
    this.isLoading = true;
    this.swiService.getFile(filename)
      .then(swi => {
        console.log(`got file ${swi}`)
        this.swi = swi as SWIHeader;
        if (this.swi) {
          console.log(swi);
          this.toast.success(`Loaded document ${this.swi.title}`, `SWI Loaded`);
        } else {
          this.toast.error(`Document is not a valid swi`, `Invalid File`);
        }
        this.isLoading = false;
      })
      .catch(err => {
        console.log(`Could not get file ${filename}`);
        //this.createFile(filename);
        // console.log('Error retreiving document: ', err);
        // this.toast.error(`SWI was in a incorrect format`, `Error Loading SWI`);
        this.isLoading = false;
      });
  }

  saveFile() {
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
  
  openLocalDocsDir() {
    this.swiService.openLocalDocumentsDirectory();
  }
}
