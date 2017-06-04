import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SWIHeader } from "../../../../models/app.models";
import { SWIFileService } from "../../../../services/swi-file.service";
import { ImageStoreService } from '../../../../services/image-store.service';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { ToastsManager } from "ng2-toastr";

@Component({
  selector: 'swi-browser-screen',
  templateUrl: './swi-browser-screen.component.html',
  styleUrls: ['./swi-browser-screen.component.scss']
  // changeDetection: ChangeDetectionStrategy.Default
})
export class SwiBrowserScreenComponent implements OnInit {

  title: string = "SWI Browser"
  localSWIs: SWIHeader[];
  isLoading: boolean = true;
  loadingMessage = "Loading SWIs";

  constructor(
    public swiService: SWIFileService,
    public imageStore: ImageStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastsManager
  ) { }

  ngOnInit() {
    let tempSwis: SWIHeader[] = this.route.snapshot.data['swis'];
    try {
      tempSwis = tempSwis.sort((a, b) => { return b.updatedOn.getTime() - a.updatedOn.getTime() });
    } catch (error) {
      console.log("Error sorting the list. Here is the swis: ", this.localSWIs);
    } finally {
      this.localSWIs = tempSwis;
      this.isLoading = false;
    }
  }

  reloadList() {
    console.log("Loading List");
    this.isLoading = true;
    this.loadingMessage = "Loading SWIs";
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

  importStarted() {
    this.toast.warning("Started importing document");
    this.isLoading = true;
    this.loadingMessage = "Importing SWI"
  }

  openSWI(swi: SWIHeader) {
    console.log(`open swi: ${swi.id}`);
    this.router.navigate(['manager', swi.id]);
  }
}
