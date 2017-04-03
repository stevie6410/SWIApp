import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiBuilderScreenComponent } from './components/swi-builder-screen/swi-builder-screen.component';
import { SharedControlsModule } from '../shared-controls/shared-controls.module';
import { SWIFileService } from '../../services/swi-file.service';

@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule
  ],
  exports: [
    SwiBuilderScreenComponent
  ],
  declarations: [
    SwiBuilderScreenComponent
  ],
  providers: [
    SWIFileService
  ]
})
export class SwiBuilderModule { }
