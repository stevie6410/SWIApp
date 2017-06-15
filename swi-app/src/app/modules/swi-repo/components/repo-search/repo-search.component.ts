import { Component, OnInit } from '@angular/core';
import { RepoDocsService } from "../../../../services/repo-docs.service";
import { SWIMaster } from "app/models/repo.models";

@Component({
  selector: 'swi-repo-search',
  templateUrl: './repo-search.component.html',
  styleUrls: ['./repo-search.component.scss']
})
export class RepoSearchComponent implements OnInit {

  results: SWIMaster[] = [];
  selectedResult: SWIMaster = null;
  loading: boolean = true;

  constructor(
    private repoStore: RepoDocsService
  ) { }

  ngOnInit() {
    this.search();
  }

  async search() {
    this.selectedResult = null;
    this.loading = true;
    this.results = await this.repoStore.getMasters().toPromise();
    this.loading = false;
  }
}
