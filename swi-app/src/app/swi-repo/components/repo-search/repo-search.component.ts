import { Component, OnInit } from '@angular/core';
import { SWIMaster, RepoDocsService, SWIRevision, SWIHeader, SWIFileService, SWIImportService, SWIMasterSearchCriteria } from "app/core";
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
  loading = true;
  msg: string[] = [];

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

  ngOnInit() {
    this.search();
  }

  async search() {
    this.selectedResult = null;
    this.loading = true;
    this.results = await this.repoStore.searchMasters(this.searchCriteria).toPromise();
    this.loading = false;
  }

  async importSWI(swiRev: SWIRevision) {
    this.notify("Downloading document");
    const doc = await this.repoStore.getDocument(swiRev.document.id);
    console.log("Got Document: ", doc);
    console.log("Parsing SWI");
    const swi: SWIHeader = JSON.parse(doc.file.data);
    console.log("Got SWI: ", swi);

    const importResult: boolean = await this.swiImportService.import(swi);
    if (!importResult) {
      console.log("Failed to import SWI");
    } else {
      console.log("Imported Succesfully");
    }
  }

  notify(msg: string){
    this.toast.success(msg, null, { maxShown: 5, newestOnTop: false, toastLife: 3000 });
  }
}
