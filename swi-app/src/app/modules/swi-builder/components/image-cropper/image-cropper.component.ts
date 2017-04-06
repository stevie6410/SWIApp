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
      aspectRatio: 4 / 3,
      minContainerHeight: 600,
      minContainerWidth: 800
    });
  }

  crop() {
    let result = this.cropperControl.getCroppedCanvas().toDataURL();
    if (result.startsWith('data:image/png;base64,')) {
      result = result.replace('data:image/png;base64,', '');
    }
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
