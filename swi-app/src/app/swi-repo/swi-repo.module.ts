import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RepoSearchComponent } from './components/repo-search/repo-search.component';
import { SharedModule } from "../shared/shared.module";
import { MomentModule } from "angular2-moment";
import { SwiLookupControlComponent } from './components/swi-lookup-control/swi-lookup-control.component';
import { RoundPipe } from "./pipes/round.pipe";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MomentModule,
    FormsModule
  ],
  exports: [
    RepoSearchComponent
  ],
  declarations: [
    RepoSearchComponent,
    SwiLookupControlComponent,
    RoundPipe
  ]
})
export class SwiRepoModule { }
