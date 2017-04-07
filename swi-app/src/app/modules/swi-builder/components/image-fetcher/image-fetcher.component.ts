import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { remote, app, dialog } from 'electron';
import { } from "angular";
import * as Electron from 'electron';
import * as fs from 'fs-promise';
import * as path from 'path';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
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
  @Output() imageSelected: EventEmitter<string> = new EventEmitter<string>();
  @Input() image: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public modal: Modal,
    private overlay: Overlay,
    private vcr: ViewContainerRef
  ) {
    overlay.defaultViewContainer = vcr;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

  getImageFromFile() {
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      title: "Open image file...",
      properties: ['openFile']
    }, ((fileNames: string[]) => {
      if (fileNames[0]) {
        this.filename = fileNames[0];
        fs.readFile(this.filename, (err, data) => {
          if (err) {
            this.hasError = true;
            this.errorMessage = err.message;
            return;
          }
          this.image = data.toString('base64');
          this.changeDetector.detectChanges();
        });
      } else {
        this.hasError = false;
      }
    }));
  }

  getImageFromCamera() {
    // this.modal.open(ImageCaptureComponent);
    this.isCaptureMode = !this.isCaptureMode;
  }

  imageCaptured(image: string) {
    console.log("Image Captured");
    this.isCaptureMode = false;
    this.isCroppingMode = false;
    this.image = image;
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