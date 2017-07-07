import { Component, OnInit, ViewChild, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";
import { ToastsManager } from 'ng2-toastr';
import { CameraService } from "../../../camera/services/camera.service";
import { SWIHeader, SWIStage, SWIStageGroup, SWIFileService, ImageStoreService, generateHash, recalculateStageSequences } from "app/core";

@Component({
  selector: 'swi-stage-edit',
  templateUrl: './swi-stage-edit.component.html',
  styleUrls: ['./swi-stage-edit.component.scss']
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
      //console.log("params", params);
      this.swi = this.route.snapshot.data['swi'];
      //console.log("swi", this.swi);
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
      this.title = `Edit Stage ${this.stage.sequence} - ${this.stage.summary}`;
    });
  }

  addImage() {
    this.imageStore.callCamera(this.stage.image, this.swi.id).then(imageKey => this.stage.image = imageKey);
  }

  public get canSave(): boolean {
    return (this.stage.summary != null);
  }

  createNewStage() {
    this.reloadForm(this.stageGroup.id, this.stage.id);
  }

  async reloadForm(groupId: string, previousStageId: string) {
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
    recalculateStageSequences(this.stageGroup);
    var previousStage = this.stageGroup.stages.filter(s => s.id == previousStageId)[0];
    this.stage = new SWIStage();
    this.stage.sequence = previousStage.sequence + 0.5;
    this.stageGroup.stages.push(this.stage);
    recalculateStageSequences(this.stageGroup);

    console.log("stage", this.stage);
    this.title = `Edit Stage ${this.stage.sequence} - ${this.stage.summary}`;
  }

  moveUp() {
    var previousStageId = this.stageGroup.stages.filter(s => s.sequence == this.stage.sequence - 1)[0].id;
    this.router.navigate(['builder', this.swi.id, 'stagegroup', this.stageGroup.id, 'stages', previousStageId]);
  }

  moveDown() {
    var nextStageId = this.stageGroup.stages.filter(s => s.sequence == this.stage.sequence + 1)[0].id;
    this.router.navigate(['builder', this.swi.id, 'stagegroup', this.stageGroup.id, 'stages', nextStageId]);
  }

  get canMoveUp(): boolean {
    return this.stage.sequence > 1;
  }

  get canMoveDown(): boolean {
    let maxSequence = this.stageGroup.stages[this.stageGroup.stages.length - 1].sequence;
    // console.log(maxSequence);
    return !(maxSequence == this.stage.sequence);
  }
}
