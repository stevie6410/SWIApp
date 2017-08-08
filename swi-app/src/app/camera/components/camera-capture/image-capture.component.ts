import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css']
})
export class ImageCaptureComponent implements OnInit, AfterViewInit {

  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  isCapturing = true;
  image: string;
  isCameraConnected = false;
  devices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  @Output() onCaptured: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.getVideoSources().then(() => {
      this.initVideo();
    });
  }

  onDeviceChange(device: MediaDeviceInfo) {
    console.log("Device selection changed", device);
    this.selectedDevice = device;
    this.initVideo();
  }

  getVideoSources(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) => {
        // this.devices = devices;
        this.devices = devices.filter(d => d.kind === 'videoinput');

        if (this.devices.length == 0) {
          this.isCameraConnected = false;
          resolve();
        }
        else if (this.devices.length == 1) {
          this.selectedDevice = this.devices[0];
          resolve();
        } else {
          // We have multiple cameras
          console.log('Multiple cameras detected');
          const rearResults = this.devices.filter(d => d.label.toLowerCase().indexOf('rear') >= 0);
          console.log('Rear results: ', rearResults);
          if (rearResults[0]) {
            this.selectedDevice = rearResults[0];
            resolve();
          }
          const backResults = this.devices.filter(d => d.label.toLowerCase().indexOf('back') >= 0);
          console.log('Back results: ', backResults);
          if (backResults[0]) {
            this.selectedDevice = backResults[0];
            resolve();
          }
          console.log('Couldnt find a webcam named back or rear so picking the second option');
          // Couldn't find any with a label of rear or back so just pick the first one
          this.selectedDevice = this.devices[1];
          resolve();
        }
      });

    });
  }

  async initVideo() {
    if (this.selectedDevice) {
      this.isCameraConnected = true;
      const _video = <HTMLVideoElement>this.video.nativeElement;
      const _canvas = <HTMLCanvasElement>this.canvas.nativeElement;
      const constraints = { video: { deviceId: { exact: this.selectedDevice.deviceId } } };

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        _video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
        _video.onloadedmetadata = () => {
          _canvas.height = 600;
          _canvas.width = 600;
        };
      }
    } else {
      this.isCameraConnected = false;
    }

  }

  getImage() {

    const _canvas = <HTMLCanvasElement>this.canvas.nativeElement;
    const _video = <HTMLVideoElement>this.video.nativeElement;
    const width = 600;
    const height = 600;
    _canvas.getContext("2d").drawImage(_video, 80, 0, 480, 480, 0, 0, 600, 600);

    const result: string = _canvas.toDataURL("image/png");

    this.onCaptured.emit(result);
    this.reset();
  }

  cancel() {
    this.onCancel.emit(null);
    this.reset();
  }

  reset() {
    this.image = null;
    this.isCapturing = true;
  }
}
