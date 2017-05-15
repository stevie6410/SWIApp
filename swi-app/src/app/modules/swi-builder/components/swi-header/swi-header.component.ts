import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SWIHeader, SWIImage } from '../../../../models/app.models';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { SWIFileService } from "../../../../../app/services/swi-file.service";
import { CameraService } from "../../../camera/services/camera.service";

@Component({
  selector: 'swi-header',
  templateUrl: './swi-header.component.html',
  styleUrls: ['./swi-header.component.css']
})
export class SwiHeaderComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Output() onSave: EventEmitter<SWIHeader> = new EventEmitter<SWIHeader>();

  title: string = "SWI Header";
  isFetchingImage: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public swiService: SWIFileService,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
  }

  save() {
    this.onSave.emit(this.swi);
  }

  getCoverImage() {
    let currentImage: string = this.swiService.getImageFromStore(this.swi, this.swi.coverImage);
    this.cameraService.requestCameraImage(currentImage).subscribe((captureImage) => {
      this.swi.coverImage = this.swiService.addImage(this.swi, captureImage.image);
      this.changeDetector.detectChanges();
    });
  }
}
