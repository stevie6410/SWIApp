import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css']
})
export class ImageCaptureComponent implements OnInit, AfterViewInit {

  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  isCapturing: boolean = true;
  image: string;

  @Output() onCaptured: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let _video = <HTMLVideoElement>this.video.nativeElement;
    console.log("Media Devices: ", navigator.mediaDevices);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          _video.src = window.URL.createObjectURL(stream);
          _video.play();
        })
    }
  }

  getImage() {
    let _canvas = <HTMLCanvasElement>this.canvas.nativeElement;
    let _video = <HTMLVideoElement>this.video.nativeElement;
    _canvas.width = 800;
    _canvas.height = 600;
    _video.style.display = "none";
    _canvas.getContext("2d").drawImage(_video, 0, 0, 800, 600, 0, 0, 800, 600);

    let result: string = _canvas.toDataURL("image/png");

    if (result.startsWith('data:image/png;base64,')) {
      result = result.replace('data:image/png;base64,', '');
    }

    this.onCaptured.emit(result);
  }


}
