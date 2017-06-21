import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { CaptureImage } from "../models/capture-image";

@Injectable()
export class CameraService {

    //Observable sources
    private cameraRequestsSource = new Subject<CaptureImage>();
    private cameraCompleteSource = new Subject<CaptureImage>();

    //Observable streams
    cameraRequestedEvents = this.cameraRequestsSource.asObservable();
    cameraCompletedEvents = this.cameraCompleteSource.asObservable();

    constructor() { }

    requestCameraImage(currentImage: string): Observable<CaptureImage> {
        let s = new Subject<CaptureImage>();
        let capImg: CaptureImage = new CaptureImage();
        if(currentImage) capImg.image = currentImage;
        this.cameraRequestsSource.next(capImg);
        console.log("Camera requested. CaptureKey: ", capImg.key);

        //Listen for the camera completed event
        this.cameraCompletedEvents.subscribe((captureImage: CaptureImage) => {
            console.log("Detected a completed camera request for capureKey: ", captureImage.key);
            s.next(captureImage);
            s.complete();
        });
        return s;
    }

    cameraCompleted(captureImage: CaptureImage) {
        this.cameraCompleteSource.next(captureImage);
    }

    cameraError(message: string){
        console.error(message);
    }
}