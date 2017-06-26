import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StandardTool, RepoStandardToolingService } from "app/core";

@Component({
  selector: 'swi-std-tooling-search',
  templateUrl: './std-tooling-search.component.html',
  styleUrls: ['./std-tooling-search.component.scss']
})
export class StdToolingSearchComponent implements OnInit {

  loading: boolean = true;
  results: StandardTool[] = [];

  constructor(
    private router: Router,
    private toolStore: RepoStandardToolingService
  ) { }

  async ngOnInit() {
    await this.search();
  }

  createNewStandardTool() {
    this.router.navigate(['repo', 'tooling', 'new']);
  }

  async search() {
    this.results = await this.toolStore.getAll().toPromise();
    this.loading = false;
  }

  edit(tool: StandardTool) {
    this.router.navigate(['repo', 'tooling', 'edit', tool.id]);
  }

  async delete(tool: StandardTool) {
    await this.toolStore.delete(tool.id).toPromise();
    this.results = this.results.filter(t => t.id != tool.id);
  }

}
