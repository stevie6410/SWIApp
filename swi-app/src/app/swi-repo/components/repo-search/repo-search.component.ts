import { Component, OnInit } from '@angular/core';
import { SWIMaster, RepoDocsService, SWIRevision, SWIHeader, SWIFileService, SWIImportService, SWIMasterSearchCriteria, CheckOutRequest } from "app/core";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'swi-repo-search',
  templateUrl: './repo-search.component.html',
  styleUrls: ['./repo-search.component.scss']
})
export class RepoSearchComponent implements OnInit {

  results: SWIMaster[] = [];
  selectedResult: SWIMaster = null;
  searchCriteria = new SWIMasterSearchCriteria();
  importingSWIs: string[] = [];
  loading = false;
  msg: string[] = [];
  localSWIKeys: string[] = [];

  constructor(
    private repoStore: RepoDocsService,
    private swiService: SWIFileService,
    private swiImportService: SWIImportService,
    private toast: ToastsManager
  ) {
    this.swiImportService.importProgress.subscribe(
      msg => {
        this.msg.push(msg);
        console.log("Import Progress: ", msg);
      }
    );
  }

  async ngOnInit() {
    await this.updateLocalKeys();
  }

  async updateLocalKeys() {
    this.localSWIKeys = await this.swiService.getAllKeys();
  }

  async search() {
    this.selectedResult = null;
    this.loading = true;
    this.results = await this.repoStore.searchMasters(this.searchCriteria).toPromise();
    this.loading = false;
  }

  /**
   * Import the latest revision of a give SWI Master. Calls the ImportSWI function internally
   * @param swiMaster
   */
  async importLatestRevision(swiMaster: SWIMaster) {
    this.importingSWIs.push(swiMaster.id);
    const maxRev = Math.max(...swiMaster.swiRevisions.map(r => r.revisionNumber));
    const swiRev = swiMaster.swiRevisions.find(r => r.revisionNumber === maxRev);
    await this.importSWI(swiRev);
    this.importingSWIs = this.importingSWIs.filter(imp => imp !== swiMaster.id);
  }

  /**
   * Imports a given SWI revision onto the device
   * @param swiRev
   */
  async importSWI(swiRev: SWIRevision) {
    this.notify("Downloading document from repository");
    const doc = await this.repoStore.getDocument(swiRev.document.id);
    this.notify("Reading SWI");
    const swi: SWIHeader = JSON.parse(doc.file.data);
    this.notify("Importing SWI onto device");
    const importResult: boolean = await this.swiImportService.import(swi);
    await this.updateLocalKeys();
    this.checkOut(swiRev);
    if (importResult) { this.notify("Imported Succesfully"); }
    this.search();
  }

  async checkOut(swiRev: SWIRevision) {
    const request = new CheckOutRequest();
    request.docId = swiRev.document.id;
    await this.repoStore.checkOut(request);
  }

  notify(msg: string) {
    this.toast.success(msg, null, { maxShown: 2, newestOnTop: false, toastLife: 3000 });
  }

  isImporting(swiMasterId: string): boolean {
    return this.importingSWIs.includes(swiMasterId);
  }

  isImported(swiMasterId: string): boolean {
    // console.log("swiMasterId", swiMasterId);
    // console.log("localSWIs", this.localSWIKeys);
    return this.localSWIKeys.includes(swiMasterId);
  }
}
