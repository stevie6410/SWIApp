import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CameraService } from "../../services/camera.service";
import { CaptureImage } from "../../models/capture-image";

@Component({
  selector: 'swi-camera',
  templateUrl: './camera-control.component.html',
  styleUrls: ['./camera-control.component.scss']
})
export class CameraControlComponent implements OnInit {

  @Input() captureImage: CaptureImage;
  @Output() onCaptured = new EventEmitter<void>();
  @Output() onCanceled = new EventEmitter<void>();

  isCroppingMode: boolean = false;
  isCaptureMode: boolean = false;
  isFileMode: boolean = false;
  image: string;

  constructor(
    private cameraService: CameraService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.image = this.captureImage.image;
    this.changeDetector.detectChanges();
  }

  captureComplete() {
    if (!this.captureImage) {
      this.cameraService.cameraError("No valid capture image object was passed into the Capture Image control");
    } else {
      this.captureImage.image = this.image;
      this.cameraService.cameraCompleted(this.captureImage);
      this.onCaptured.emit();
    }
  }

  cancelCapture() {
    this.cameraService.cameraCompleted(this.captureImage);
    this.onCaptured.emit();
  }

  //#####################################

  setImage(image: string, crop: boolean){
    this.image = image;
    this.isCaptureMode = false;
    this.isCroppingMode = crop;
    this.isFileMode = false;  
    this.changeDetector.detectChanges();  
  }

  getImageFromFile() {
    this.isFileMode = true;
    this.isCaptureMode = false;
    this.isCroppingMode = false;
  }

  getImageFromCamera() {
    this.isCaptureMode = !this.isCaptureMode;
    this.isFileMode = false;
    this.isCroppingMode = false;
  }

  toggleCroppingMode() {
    this.isCroppingMode = !this.isCroppingMode;
    this.changeDetector.detectChanges();
    console.log('Cropping Mode: ', this.isCroppingMode);
  }
}