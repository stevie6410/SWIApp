import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraControlComponent } from './components/camera-control/camera-control.component';
import { CameraService } from "./services/camera.service";
import { ImageCaptureComponent } from "./components/camera-capture/image-capture.component";
import { ImageCropperComponent } from "./components/camera-cropper/image-cropper.component";
import { ImageFileComponent } from "./components/image-file/image-file.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CameraControlComponent
  ],
  declarations: [
    CameraControlComponent,
    ImageCaptureComponent,
    ImageCropperComponent,
    ImageFileComponent
  ],
  providers: [
    CameraService
  ]
})
export class CameraModule { }
