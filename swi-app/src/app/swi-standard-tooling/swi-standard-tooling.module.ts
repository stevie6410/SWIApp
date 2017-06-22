import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "app/shared";
import {
  StdToolingSearchComponent,
  StdToolingFormComponent,
  StdToolingLookupComponent
} from "app/swi-standard-tooling";


@NgModule({
  imports: [
    CommonModule,
    SharedModule
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
  ]
})
export class SwiStandardToolingModule { }
