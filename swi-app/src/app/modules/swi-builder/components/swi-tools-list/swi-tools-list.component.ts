import { Component, OnInit, Input } from '@angular/core';
import { SWIHeader, SWITool } from "../../../../../app/models/app.models";
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";

@Component({
  selector: 'swi-tools-list',
  templateUrl: './swi-tools-list.component.html',
  styleUrls: ['./swi-tools-list.component.css']
})
export class SwiToolsListComponent implements OnInit {

  @Input() swi: SWIHeader;
  title: string = "Tooling";

  constructor() { }

  ngOnInit() {
  }

  getImageFromKey(key: string): string {
    try {
      if (!key) return ImagePlaceholder;
      return this.swi.swiImages.filter(i => i.key == key)[0].value;
    } catch (error) {
      return ImagePlaceholder;
    }
  }

}
