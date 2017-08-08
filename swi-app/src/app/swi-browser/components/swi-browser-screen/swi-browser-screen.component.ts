import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { ImageStoreService, SWIFileService, SWIHeader, SwiUpgradeService, AppCatalogService } from "app/core";
import { EnvironmentService } from "app/app/services/environment.service";

@Component({
  selector: 'swi-browser-screen',
  templateUrl: './swi-browser-screen.component.html',
  styleUrls: ['./swi-browser-screen.component.scss']
})
export class SwiBrowserScreenComponent implements OnInit {

  title = "SWI Browser"
  localSWIs: SWIHeader[];
  isLoading = true;
  loadingMessage = "Loading SWIs";
  isCleaning = false;
  progress: number = null;
  maxDocumentWarningLimit = 10;


  constructor(
    public swiService: SWIFileService,
    public imageStore: ImageStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastsManager,
    public environment: EnvironmentService,
    public upgrade: SwiUpgradeService,
    private appCatalog: AppCatalogService
  ) { }

  ngOnInit() {
    const tempSwis: SWIHeader[] = this.route.snapshot.data['swis'];
    this.localSWIs = tempSwis;
    this.isLoading = false;
    this.cleanImageStore();
    this.setDocumentLimitWarning();
  }

  setDocumentLimitWarning() {
    this.appCatalog.getAppSetting("LocalDocumentsWarningLimit").then(
      setting => {
        if (setting) {
          console.log("LocalDocumentsWarningLimit: ", setting);
          this.maxDocumentWarningLimit = +setting.value;
        }
      }
    );

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
          if (new Date(b.updatedOn).getTime() < new Date(a.updatedOn).getTime()) { return -1; }
          if (new Date(b.updatedOn).getTime() > new Date(a.updatedOn).getTime()) { return 1; }
          return 0;
        });
      } catch (error) {
        console.log("Sorting alphabetiaclly");
        this.localSWIs = results.sort(function (a, b) { return a.title.localeCompare(b.title); });
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
    this.loadingMessage = "Importing SWI";
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

  public upgradeRequired(swi: SWIHeader) {
    return this.upgrade.upgradeRequired(swi);
  }
}
