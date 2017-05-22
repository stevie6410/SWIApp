import { Component, OnInit, ViewChild, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";
import { ToastsManager } from 'ng2-toastr';
import { SWIHeader, SWIStage, SWIImage, generateHash, hasChanges } from '../../../../models/app.models';
import { SWIFileService } from '../../../../services/swi-file.service';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { CameraService } from "../../../camera/services/camera.service";

@Component({
  selector: 'swi-stage-edit',
  templateUrl: './swi-stage-edit.component.html',
  styleUrls: ['./swi-stage-edit.component.css']
})
export class SwiStageEditComponent implements OnInit {

  title: string = "Edit Stage";
  swi: SWIHeader;
  stage: SWIStage;
  sequence: number;
  initialState: number;

  constructor(
    private route: ActivatedRoute,
    public swiService: SWIFileService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private cameraService: CameraService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.sequence = +params['sequence'];
      this.swi = this.route.snapshot.data['swi'];
      this.initialState = generateHash(JSON.stringify(this.swi));
      this.stage = this.swi.swiStages.filter(s => s.sequence == this.sequence)[0];
      this.title = `SWI Builder - ${this.swi.title} - Edit Stage - ${this.sequence}`;
    });
  }

  addImage() {
    let currentImage: string = this.swiService.getImageFromStore(this.swi, this.stage.image);
    this.cameraService.requestCameraImage(currentImage).subscribe((captureImage) => {
      this.stage.image = this.swiService.addImage(this.swi, captureImage.image);
      this.changeDetector.detectChanges();
    });
  }

  getImageFromKey(key: string): string {
    try {
      if (!key) return ImagePlaceholder;
      return this.swi.swiImages.filter(i => i.key == key)[0].value;
    } catch (error) {
      return ImagePlaceholder;
    }
  }
}
