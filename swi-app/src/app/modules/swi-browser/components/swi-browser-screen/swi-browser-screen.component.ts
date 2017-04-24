import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SWIHeader } from "../../../../models/app.models";
import { SWIFileService } from "../../../../services/swi-file.service";
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'swi-browser-screen',
  templateUrl: './swi-browser-screen.component.html',
  styleUrls: ['./swi-browser-screen.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SwiBrowserScreenComponent implements OnInit {

  title: string = "SWI Browser"
  localSWIs: SWIHeader[];
  newSWIName: string = "Enter new SWI name";
  selectedSWI: SWIHeader;

  constructor(
    private swiService: SWIFileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.swiService.getAllFiles().then((results: SWIHeader[]) => {
      try {
        this.localSWIs = results.sort(function (a, b) { return b.updatedOn.getTime() - a.updatedOn.getTime() });
      } catch (error) {
        this.localSWIs = results;
        console.log("Error sorting the list. Here is the swis: ", this.localSWIs);
      }
    });
  }

  getImageFromKey(swi: SWIHeader, key: string): string {
    if (!key) return ImagePlaceholder;
    try {
      let result = swi.swiImages.filter(i => i.key == key)[0];
      if (result) return result.value;
    } catch (error) {
      return ImagePlaceholder;
    }
  }

  openSWI(swi: SWIHeader) {
    console.log(`open swi: ${swi.id}`);
    this.router.navigate(['swibuilder', swi.id]);
  }

  selectSWI(swi: SWIHeader) {
    this.selectedSWI = swi;
  }

  isSelected(swi: SWIHeader) {
    if (!swi || !this.selectedSWI) {
      return false;
    } else {
      return (swi.filename == this.selectedSWI.filename);
    }
  }
}
