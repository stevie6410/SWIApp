import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiPageComponent } from './swi-page/swi-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SwiPageComponent],
  exports: [SwiPageComponent]
})
export class SwiCommonModule { }
