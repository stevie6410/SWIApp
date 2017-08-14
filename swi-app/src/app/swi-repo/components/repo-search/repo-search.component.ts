import { Component, OnInit } from '@angular/core';
import { SWIMaster, RepoDocsService, SWIRevision, SWIHeader, SWIFileService, SWIImportService } from "app/core";

@Component({
  selector: 'swi-repo-search',
  templateUrl: './repo-search.component.html',
  styleUrls: ['./repo-search.component.scss']
})
export class RepoSearchComponent implements OnInit {

  results: SWIMaster[] = [];
  selectedResult: SWIMaster = null;
  loading = true;
  msg: string[] = [];

  constructor(
    private repoStore: RepoDocsService,
    private swiService: SWIFileService,
    private swiImportService: SWIImportService
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
    this.results = await this.repoStore.getMasters().toPromise();
    this.loading = false;
  }

  async importSWI(swiRev: SWIRevision) {
    console.log("Downloading document");
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
}
