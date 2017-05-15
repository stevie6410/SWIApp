import { Component, OnInit } from '@angular/core';
import { CameraService } from "../../camera/services/camera.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Standard Work Instructions!!';
  isCameraMode: boolean = false;
  image: string;

  constructor(
    private cameraService: CameraService
  ) { }

  ngOnInit() {
  }

  toggleCameraMode() {
    this.isCameraMode = !this.isCameraMode;
  }

  requestCamera() {
    this.cameraService.requestCameraImage().subscribe((captureImage) => {
      console.log("Got image: ", captureImage);
      this.image = captureImage.image;
    });
  }
}
