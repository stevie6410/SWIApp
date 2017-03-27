import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiService } from '../../shared/services/swi.service';
import { SwiBuilderComponent } from './swi-builder.component';
import { SwiCommonModule } from '../swi-common/swi-common.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    SwiCommonModule,
    BrowserModule
  ],
  declarations: [
    SwiBuilderComponent
  ],
  exports: [
    SwiBuilderComponent
  ],
  providers: [
    SwiService
  ]
})
export class SwiBuilderModule { }
