import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiBuilderScreenComponent } from './components/swi-builder-screen/swi-builder-screen.component';
import { SharedControlsModule } from '../shared-controls/shared-controls.module';
import { SWIFileService } from '../../services/swi-file.service';
import { SwiHeaderComponent } from './components/swi-header/swi-header.component';

@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule,
    FormsModule
  ],
  exports: [
    SwiBuilderScreenComponent
  ],
  declarations: [
    SwiBuilderScreenComponent,
    SwiHeaderComponent
  ],
  providers: [
    SWIFileService
  ]
})
export class SwiBuilderModule { }
