import { Component, OnInit, ViewChild, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";
import { ToastsManager } from 'ng2-toastr';
import { CameraService } from "../../../camera/services/camera.service";
import { SWIHeader, SWIStage, SWIStageGroup, SWIFileService, ImageStoreService, generateHash } from "app/core";

@Component({
  selector: 'swi-stage-edit',
  templateUrl: './swi-stage-edit.component.html',
  styleUrls: ['./swi-stage-edit.component.css']
})
export class SwiStageEditComponent implements OnInit {

  title: string = "Edit Stage";
  swi: SWIHeader;
  stage: SWIStage;
  stageGroup: SWIStageGroup;
  groupId: string;
  stageId: string;
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
      console.log("params", params);
      this.swi = this.route.snapshot.data['swi'];
      console.log("swi", this.swi);
      this.initialState = generateHash(JSON.stringify(this.swi));
      this.stageId = params['stageid'];
      this.groupId = params['groupid'];
      //Get the group
      this.stageGroup = this.swi.stageGroups.filter(sg => sg.id == this.groupId)[0];
      if (!this.stageGroup)
        console.log("Error: Could not find group");

      console.log("group", this.stageGroup);


      if (this.stageId == "new") {
        console.log("Creating new SWIStage");
        //New SWIStage is required
        this.stage = new SWIStage();
        this.stage.sequence = this.stageGroup.stages.length + 1;
        this.stageGroup.stages.push(this.stage);
      } else {
        console.log("Fetching SWIStage " + this.stageId.toString());
        //Fetch the existing stage from the SWI 
        this.stage = this.stageGroup.stages.filter(s => s.id == this.stageId)[0];
      }
      console.log("stage", this.stage);
      this.title = `SWI Builder - ${this.swi.title} - Edit Stage - ${this.stageId}`;
    });
  }

  addImage() {
    this.imageStore.callCamera(this.stage.image, this.swi.id).then(imageKey => this.stage.image = imageKey);
  }

  public get canSave(): boolean {
    return (this.stage.summary != null);
  }

  createNewStage() {
    this.reloadForm(this.stageGroup.id);
  }

  async reloadForm(groupId: string) {

    //Get the new SWI from the store
    this.swi = await this.swiService.getFile(this.swi.id);
    console.log("swi", this.swi);
    this.initialState = generateHash(JSON.stringify(this.swi));
    this.stageId = "new";
    this.groupId = groupId;
    //Get the group
    this.stageGroup = this.swi.stageGroups.filter(sg => sg.id == this.groupId)[0];
    if (!this.stageGroup)
      console.log("Error: Could not find group");

    console.log("Creating new SWIStage");
    //New SWIStage is required
    this.stage = new SWIStage();
    this.stage.sequence = this.stageGroup.stages.length + 1;
    this.stageGroup.stages.push(this.stage);

    console.log("stage", this.stage);
    this.title = `SWI Builder - ${this.swi.title} - Edit Stage - ${this.stageId}`;
  }
}
