import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SWIHeader } from "../../../../models/app.models";
import { SWIFileService } from "../../../../services/swi-file.service";
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";

@Component({
  selector: 'swi-browser-screen',
  templateUrl: './swi-browser-screen.component.html',
  styleUrls: ['./swi-browser-screen.component.css']
})
export class SwiBrowserScreenComponent implements OnInit {

  title: string = "SWI Browser"
  localSWIs: SWIHeader[];
  isLoading: boolean = true;

  constructor(
    public swiService: SWIFileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.swiService.getAllFiles().then((results: SWIHeader[]) => {
      try {
        this.localSWIs = results.sort(function (a, b) { return b.updatedOn.getTime() - a.updatedOn.getTime() });
      } catch (error) {
        this.localSWIs = results;
        console.log("Error sorting the list. Here is the swis: ", this.localSWIs);
      } finally {
        this.isLoading = false;
      }
    });
  }

  openSWI(swi: SWIHeader) {
    console.log(`open swi: ${swi.id}`);
    this.router.navigate(['manager', swi.id]);
  }
}
