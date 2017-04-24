import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { ImageCaptureComponent } from "../image-capture/image-capture.component";

@Component({
  selector: 'image-fetcher',
  templateUrl: './image-fetcher.component.html',
  styleUrls: ['./image-fetcher.component.css']
})

export class ImageFetcherComponent implements OnInit, AfterViewInit {

  filename: string;
  hasError: boolean = false;
  errorMessage: string;
  isCroppingMode: boolean = false;
  isCaptureMode: boolean = false;
  isFileMode: boolean = false;

  @Output() imageSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() canceled = new EventEmitter<void>();
  @Input() image: string;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
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

  imageCaptured(image: string) {
    console.log("Image Captured");
    this.isCaptureMode = false;
    this.isCroppingMode = false;
    this.isFileMode = false;
    this.image = image;
  }

  cancelImageCapture() {
    this.isCaptureMode = false;
    this.isCroppingMode = false;
    this.canceled.emit();
  }

  toggleCroppingMode() {
    this.isCroppingMode = !this.isCroppingMode;
    this.changeDetector.detectChanges();
    console.log('Cropping Mode: ', this.isCroppingMode);
  }

  onCropped(image: string) {
    console.log('Detected a new cropped image');
    this.image = image;
    this.isCroppingMode = false;
    this.changeDetector.detectChanges();
  }

  imageComplete() {
    this.imageSelected.emit(this.image);
  }  
}