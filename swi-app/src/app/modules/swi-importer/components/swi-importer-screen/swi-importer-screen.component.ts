import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SWIHeader } from "app/models/app.models";
import { SWIFileService } from "../../../../services/swi-file.service";

@Component({
  selector: 'swi-swi-importer-screen',
  templateUrl: './swi-importer-screen.component.html',
  styleUrls: ['./swi-importer-screen.component.scss']
})
export class SwiImporterScreenComponent implements OnInit, AfterViewInit {

  title: string = "SWI Importer";

  @ViewChild("swiImport") swiImport: ElementRef;

  constructor(
    private swiService: SWIFileService
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
    this.swiService.createSWI(swi);
  }

}
