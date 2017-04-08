import { Component, OnInit } from '@angular/core';
import { SWIFileService } from "../../../../services/swi-file.service";
import { SWIHeader } from "../../../../models/app.models";

@Component({
  selector: 'swi-browser-screen',
  templateUrl: './swi-browser-screen.component.html',
  styleUrls: ['./swi-browser-screen.component.css']
})
export class SwiBrowserScreenComponent implements OnInit {

  title: string = "SWI Browser"
  localSWIs: SWIHeader[];

  constructor(
    private swiService: SWIFileService
  ) { }

  ngOnInit() {
    this.swiService.getAllFiles().then((results: SWIHeader[]) => {
      this.localSWIs = results;
    })
  }

  getImageFromKey(swi: SWIHeader, key: string): string {
    let result = swi.swiImages.filter(i => i.key == key)[0];
    if (result) return result.value;
  }

}
