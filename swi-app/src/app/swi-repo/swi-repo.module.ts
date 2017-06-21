import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoSearchComponent } from './components/repo-search/repo-search.component';
import { SharedModule } from "../shared/shared.module";
import { MomentModule } from "angular2-moment";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MomentModule
  ],
  exports: [
    RepoSearchComponent
  ],
  declarations: [
    RepoSearchComponent
  ]
})
export class SwiRepoModule { }
