import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiManagerScreenComponent } from './components/swi-manager-screen/swi-manager-screen.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SwiManagerScreenComponent
  ],
  declarations: [
    SwiManagerScreenComponent
  ]
})
export class SwiManagerModule { }
