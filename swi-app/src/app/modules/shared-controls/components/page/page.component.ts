import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";

import { CameraService } from "../../../camera/services/camera.service";
import { CaptureImage } from "app/modules/camera/models/capture-image";
import * as $ from 'jquery';

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
  @Input() isLoading: boolean = true;
  @Input() loadingMessage: string;
  @Input() progressNumber: number;
  @Output() onBackButtonClick = new EventEmitter<void>();

  isCameraMode: boolean = false;
  captureImage: CaptureImage;

  constructor(
    private location: Location,
    private cameraService: CameraService,
    private router: Router
  ) {
    $('#content').animate({ scrollTop: 0 }, 200);

    //Router Events to set the isLoading flag
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

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

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      // console.log("Navigation Started");
      this.isLoading = true;
    }
    if (event instanceof NavigationEnd) {
      // console.log("Navigation Ended");
      this.isLoading = false;
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.isLoading = false;
    }
    if (event instanceof NavigationError) {
      this.isLoading = false;
    }
  }

}
