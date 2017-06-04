import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SWIHeader, SWIImage } from '../../../../models/app.models';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { SWIFileService } from "../../../../../app/services/swi-file.service";
import { CameraService } from "../../../camera/services/camera.service";
import { ImageStoreService } from '../../../../services/image-store.service';

@Component({
  selector: 'swi-header',
  templateUrl: './swi-header.component.html',
  styleUrls: ['./swi-header.component.scss']
})
export class SwiHeaderComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Output() onSave: EventEmitter<SWIHeader> = new EventEmitter<SWIHeader>();

  title: string = "SWI Header";
  isFetchingImage: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public swiService: SWIFileService,
    public imageStore: ImageStoreService,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
  }

  save() {
    this.onSave.emit(this.swi);
  }

  getCoverImage() {
    this.imageStore.callCamera(this.swi.coverImage, this.swi.id)
      .then(imageKey => {
        console.log("Got a new image key: ", imageKey);
        this.swi.coverImage = imageKey;
      });
  }
}
