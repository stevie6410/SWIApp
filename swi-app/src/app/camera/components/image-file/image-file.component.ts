import { Component, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'image-file',
  templateUrl: './image-file.component.html',
  styleUrls: ['./image-file.component.scss']
})
export class ImageFileComponent implements OnInit {

  @Output() imageSelected = new EventEmitter<string>();
  @ViewChild("filePicker") el: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // let ctrl: HTMLInputElement = this.
    let input: HTMLInputElement = this.el.nativeElement;
    input.onchange = (e) => {
      console.log(e);
      let srcEl: any = e.srcElement;
      let files: FileList = srcEl.files;
      if (files) {
        // console.log("Files Selected: ", files);
        var reader: FileReader = new FileReader();
        reader.onloadend = () => {
          // console.log("file: ", files[0]);
          let img: string = files[0].type.match('image') ? reader.result : '';
          // console.log(img);
          this.imageSelected.emit(img);
        };
        reader.readAsDataURL(files[0]);
      }
    }
  }
}
