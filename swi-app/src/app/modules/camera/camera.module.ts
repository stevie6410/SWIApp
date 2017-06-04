import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { CameraService } from "./services/camera.service";
import { CameraControlComponent } from './components/camera-control/camera-control.component';
import { ImageCaptureComponent } from "./components/camera-capture/image-capture.component";
import { ImageCropperComponent } from "./components/camera-cropper/image-cropper.component";
import { ImageFileComponent } from "./components/image-file/image-file.component";
import { SharedControlsModule } from "../shared-controls/shared-controls.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // SharedControlsModule
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
export class CameraModule {
  constructor() {
    console.assert(SharedControlsModule, "Uhoh, Something was not defined, likely part of a circular reference loop");
  }
}
