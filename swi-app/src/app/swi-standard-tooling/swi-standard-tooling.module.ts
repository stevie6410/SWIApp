import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "app/shared";
import { SwiRepoModule } from "app/swi-repo/swi-repo.module";
import {
  StdToolingSearchComponent,
  StdToolingFormComponent,
  StdToolingLookupComponent,
  SWIStandardToolResolver
} from "app/swi-standard-tooling";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    SwiRepoModule
  ],
  exports: [
    StdToolingSearchComponent,
    StdToolingFormComponent,
    StdToolingLookupComponent
  ],
  declarations: [
    StdToolingSearchComponent,
    StdToolingFormComponent,
    StdToolingLookupComponent
  ],
  providers: [
    SWIStandardToolResolver
  ]
})
export class SwiStandardToolingModule { }
