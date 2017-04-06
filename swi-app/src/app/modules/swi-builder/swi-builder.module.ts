import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiBuilderScreenComponent } from './components/swi-builder-screen/swi-builder-screen.component';
import { SharedControlsModule } from '../shared-controls/shared-controls.module';
import { SWIFileService } from '../../services/swi-file.service';
import { SwiHeaderComponent } from './components/swi-header/swi-header.component';
import { SwiStagesListComponent } from './components/swi-stages-list/swi-stages-list.component';
import { SwiStageEditComponent } from './components/swi-stage-edit/swi-stage-edit.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ImageFetcherComponent } from './components/image-fetcher/image-fetcher.component';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';

@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    SwiBuilderScreenComponent
  ],
  declarations: [
    SwiBuilderScreenComponent,
    SwiHeaderComponent,
    SwiStagesListComponent,
    SwiStageEditComponent,
    ImageFetcherComponent,
    ImageCropperComponent
  ],
  providers: [
    SWIFileService
  ]
})
export class SwiBuilderModule { }
