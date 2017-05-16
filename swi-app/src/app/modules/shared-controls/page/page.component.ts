import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { CameraService } from "../../camera/services/camera.service";
import { CaptureImage } from "app/modules/camera/models/capture-image";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss', './page-spinner.css']
})
export class PageComponent implements OnInit {

  @Input() title: string;
  @Input() backButton: boolean = true;
  @Input() overrideBackButton: boolean = false;
  @Input() faIcon: string;
  @Input() isLoading: boolean = false;
  @Input() loadingMessage: string;
  @Output() onBackButtonClick = new EventEmitter<void>();
  
  isCameraMode: boolean = false;
  captureImage: CaptureImage;

  constructor(
    private location: Location,
    private cameraService: CameraService
  ) {
    //New Capture Requests
    this.cameraService.cameraRequestedEvents.subscribe((captureImage: CaptureImage) => {
      this.isCameraMode = true;
      this.captureImage = captureImage;
    });
  }

  ngOnInit() {
  }

  navBack() {
    this.onBackButtonClick.emit();
    if (!this.overrideBackButton) this.location.back();
  }

  onCaptured() {
    this.isCameraMode = false;
  }
}
