import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ToastsManager } from "ng2-toastr";
import { SWIHeader, SWIFileService } from "app/core";

@Component({
  selector: 'swi-swi-importer-screen',
  templateUrl: './swi-importer-screen.component.html',
  styleUrls: ['./swi-importer-screen.component.scss']
})
export class SwiImporterScreenComponent implements OnInit, AfterViewInit {

  title: string = "SWI Importer";

  @ViewChild("swiImport") swiImport: ElementRef;

  constructor(
    private swiService: SWIFileService,
    private toast: ToastsManager
  ) { }
  ngOnInit() {
  }

  ngAfterViewInit() {
    let input: HTMLInputElement = this.swiImport.nativeElement;
    input.onchange = (e) => {
      console.log(e);
      let srcEl: any = e.srcElement;
      let files: FileList = srcEl.files;
      if (files) {
        console.log("Files Selected: ", files);
        
        var reader: FileReader = new FileReader();
        reader.onloadend = () => {
          let rawSWI: any = reader.result;
          this.handleRawSWI(rawSWI);
        };
        reader.readAsText(files[0], 'utf8');
      }
    }
  }

  handleRawSWI(rawSWI: string) {
    let swi: SWIHeader;
    swi = JSON.parse(rawSWI);
    console.log("swi: ", swi);
    this.loadSWIIntoMemory(swi);
  }

  loadSWIIntoMemory(swi: SWIHeader) {
    this.swiService.add(swi).then((importedSwi: SWIHeader) => {
      console.log(`SWI has been imported:  ${importedSwi.title}`);
      this.toast.success(importedSwi.title, "SWI has been imported");
    }).catch(err => {
      console.log("SWI could not be imported", err);
      if (err && err.message && err.message == "Key already exists in the object store.") {
        this.toast.error(`SWI already imported`);
      } else {
        this.toast.error(`SWI could not be imported:`);
      }
    });
  }
}