import { Component, OnInit, ViewChild, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";
import { ToastsManager } from 'ng2-toastr';
import { SWIHeader, SWIStage, SWIImage, generateHash, hasChanges } from '../../../../models/app.models';
import { SWIFileService } from '../../../../services/swi-file.service';
import { ImageStoreService } from '../../../../services/image-store.service';
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
    public imageStore: ImageStoreService,
    private router: Router,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.swi = this.route.snapshot.data['swi'];
      this.initialState = generateHash(JSON.stringify(this.swi));
      this.sequence = params['sequence'];

      console.log("swi", this.swi);
      console.log("sequence", this.sequence);

      if (this.sequence == 0) {
        console.log("Creating new SWIStage");
        //New SWIStage is required
        this.stage = new SWIStage();
        this.stage.sequence = this.swi.swiStages.length + 1;
        this.sequence = this.stage.sequence;
        this.swi.swiStages.push(this.stage);
      } else {
        console.log("Fetching SWIStage " + this.sequence.toString());
        //Fetch the existing stage from the SWI 
        this.stage = this.swi.swiStages.filter(s => s.sequence == this.sequence)[0];
      }
      this.title = `SWI Builder - ${this.swi.title} - Edit Stage - ${this.sequence}`;
    });
  }

  addImage() {
    this.imageStore.callCamera(this.stage.image, this.swi.id).then(imageKey => this.stage.image = imageKey);
  }

  public get canSave(): boolean {
    return (this.stage.summary != null);
  }

}
