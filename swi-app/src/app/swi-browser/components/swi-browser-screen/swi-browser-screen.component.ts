import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { ImageStoreService, SWIFileService, SWIHeader } from "app/core";

@Component({
  selector: 'swi-browser-screen',
  templateUrl: './swi-browser-screen.component.html',
  styleUrls: ['./swi-browser-screen.component.scss']
})
export class SwiBrowserScreenComponent implements OnInit {

  title: string = "SWI Browser"
  localSWIs: SWIHeader[];
  isLoading: boolean = true;
  loadingMessage = "Loading SWIs";
  isCleaning: boolean = false;
  progress: number = null;

  constructor(
    public swiService: SWIFileService,
    public imageStore: ImageStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastsManager
  ) { }

  ngOnInit() {
    let tempSwis: SWIHeader[] = this.route.snapshot.data['swis'];
    this.localSWIs = tempSwis;
    this.isLoading = false;
    this.cleanImageStore();
  }

  reloadList() {
    console.log("Loading List");
    this.isLoading = true;
    this.loadingMessage = "Loading SWIs";
    this.swiService.getAllFiles().then((results: SWIHeader[]) => {
      console.log(results);
      try {
        console.log("Sorting by date");
        this.localSWIs = results.sort(function (a, b) {
          if (new Date(b.updatedOn).getTime() < new Date(a.updatedOn).getTime()) return -1;
          if (new Date(b.updatedOn).getTime() > new Date(a.updatedOn).getTime()) return 1;
          return 0;
        });
      } catch (error) {
        console.log("Sorting alphabetiaclly");
        this.localSWIs = results.sort(function (a, b) { return a.title.localeCompare(b.title) });
        console.log("Error sorting the list: ", error);
        console.log(this.localSWIs);
      } finally {
        this.isLoading = false;
      }
    });
  }

  importStarted() {
    // this.toast.warning("Started importing document");
    this.isLoading = true;
    this.loadingMessage = "Importing SWI"
  }

  openSWI(swi: SWIHeader) {
    console.log(`open swi: ${swi.id}`);
    this.router.navigate(['manager', swi.id]);
  }

  async cleanImageStore() {
    this.isCleaning = true;
    await this.imageStore.clean();
    this.isCleaning = false;
  }
}