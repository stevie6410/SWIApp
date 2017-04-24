import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as Cropper from 'cropperjs';

@Component({
  selector: 'image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit, AfterViewInit {

  @Input() image: string;
  @Output() onCropped: EventEmitter<string> = new EventEmitter<string>();
  croppedImage: string;

  cropperControl: Cropper;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // this.initCropper();
  }

  ngAfterViewInit() {
    this.initCropper();
  }

  initCropper() {
    var imageCropper = <HTMLImageElement>document.getElementById('imageCropper');
    this.cropperControl = new Cropper(imageCropper, {
      aspectRatio: 1 / 1,
      minContainerHeight: 600,
      minContainerWidth: 600
    });
  }

  crop() {
    let result = this.cropperControl.getCroppedCanvas().toDataURL();
    this.croppedImage = result;
    this.destroyCropper();
    this.onCropped.emit(this.croppedImage);
  }

  destroyCropper() {
    if (this.cropperControl) {
      this.cropperControl.destroy();
    }
  }

}
