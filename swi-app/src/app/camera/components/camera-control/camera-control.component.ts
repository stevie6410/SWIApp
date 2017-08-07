import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { CameraService } from "../../services/camera.service";
import { CaptureImage } from "../../models/capture-image";
import { ImageCropperComponent } from "../camera-cropper/image-cropper.component";
import { GUID } from "app/core";
import { Modal } from "angular2-modal/plugins/bootstrap";

@Component({
  selector: 'swi-camera',
  templateUrl: './camera-control.component.html',
  styleUrls: ['./camera-control.component.scss']
})
export class CameraControlComponent implements OnInit, AfterViewInit {

  @Input() captureImage: CaptureImage;
  @Output() onCaptured = new EventEmitter<void>();
  @Output() onCanceled = new EventEmitter<void>();
  @ViewChild("cropper") cropper: ImageCropperComponent;

  isCroppingMode = false;
  isCaptureMode = false;
  isFileMode = false;
  image: string;

  constructor(
    private cameraService: CameraService,
    private changeDetector: ChangeDetectorRef,
    private modal: Modal
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

  deleteImage() {

    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(false)
      .keyboard(27)
      .titleHtml('<h5>Confirm Delete Image</h5>')
      .body(`Are you sure you want to delete image?`)
      .okBtn('Delete Image')
      .okBtnClass('btn btn-danger')
      .cancelBtn('Cancel')
      .cancelBtnClass('btn btn-secondary')
      .open()
      .then(dialogRef => dialogRef.result)
      .then(result => {

        // Execute delete logic

        const captureImage = new CaptureImage();
        this.image = null;
        this.captureImage.image = null;
        this.captureImage.key = new GUID().value;

        this.cameraService.cameraCompleted(this.captureImage);
        this.onCaptured.emit();
      })
      .catch(err => console.log("Canceled delete image"));
  }

  // #####################################

  setImage(image: string, crop: boolean) {
    this.image = image;
    this.isCaptureMode = false;
    this.isCroppingMode = crop;
    this.isFileMode = false;
    this.changeDetector.detectChanges();
  }

  toggleFileMode() {
    this.isFileMode = true;
    this.isCaptureMode = false;
    this.isCroppingMode = false;
  }

  toggleCaptureMode() {
    this.isCaptureMode = !this.isCaptureMode;
    this.isFileMode = false;
    this.isCroppingMode = false;
  }

  toggleCroppingMode() {
    this.isCroppingMode = !this.isCroppingMode;
    this.changeDetector.detectChanges();
  }
}
