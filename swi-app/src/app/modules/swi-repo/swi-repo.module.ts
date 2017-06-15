import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoSearchComponent } from './components/repo-search/repo-search.component';
import { SharedControlsModule } from "../../modules/shared-controls/shared-controls.module";
import { MomentModule } from "angular2-moment";

@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule,
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
