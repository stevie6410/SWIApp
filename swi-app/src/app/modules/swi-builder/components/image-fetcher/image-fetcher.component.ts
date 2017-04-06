import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { remote, app, dialog } from 'electron';
import * as Electron from 'electron';
import * as fs from 'fs-promise';
import * as path from 'path';

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
  @Output() imageSelected: EventEmitter<string> = new EventEmitter<string>();
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