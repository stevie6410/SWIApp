import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { SwiCardComponent } from './swi-card/swi-card.component';
import { ImageFetcherComponent } from './image-fetcher/image-fetcher.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImageCaptureComponent } from './image-capture/image-capture.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PageComponent,
    SwiCardComponent,
    ImageCaptureComponent,
    ImageFetcherComponent,
    ImageCropperComponent
  ],
  declarations: [
    PageComponent,
    SwiCardComponent,
    ImageFetcherComponent,
    ImageCaptureComponent,
    ImageCropperComponent
  ],
  entryComponents:[
    ImageCaptureComponent
  ]
})
export class SharedControlsModule { }
