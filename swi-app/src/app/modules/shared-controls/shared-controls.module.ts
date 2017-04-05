import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { SwiCardComponent } from './swi-card/swi-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PageComponent,
    SwiCardComponent
  ],
  declarations: [
    PageComponent,
    SwiCardComponent
  ]
})
export class SharedControlsModule { }
