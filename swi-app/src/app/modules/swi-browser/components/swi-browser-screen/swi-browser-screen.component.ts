import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SWIHeader } from "../../../../models/app.models";
import { SWIFileService } from "../../../../services/swi-file.service";
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { ToastsManager } from "ng2-toastr";

@Component({
  selector: 'swi-browser-screen',
  templateUrl: './swi-browser-screen.component.html',
  styleUrls: ['./swi-browser-screen.component.scss']
})
export class SwiBrowserScreenComponent implements OnInit {

  title: string = "SWI Browser"
  localSWIs: SWIHeader[];
  isLoading: boolean = true;

  constructor(
    public swiService: SWIFileService,
    private router: Router,
    private toast: ToastsManager
  ) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    console.log("Loading List");
    this.isLoading = true;
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

  importStarted(){
    this.toast.warning("Started importing document");
  }

  openSWI(swi: SWIHeader) {
    console.log(`open swi: ${swi.id}`);
    this.router.navigate(['manager', swi.id]);
  }
}
