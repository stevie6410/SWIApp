import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { ToastsManager } from "ng2-toastr";
import { SWIHeader, SWIStageGroup, SWIStage, SWITool } from "app/core";


@Component({
  selector: 'swi-group',
  templateUrl: './swi-group.component.html',
  styleUrls: ['./swi-group.component.scss']
})
export class SwiGroupComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Input() group: SWIStageGroup;
  @Output() onSave = new EventEmitter<void>();

  editMode: boolean = false;
  selectedStage: SWIStage;
  moveToGroupList: SWIStageGroup[];

  constructor(
    private router: Router,
    public modal: Modal,
    private toast: ToastsManager
  ) { }

  ngOnInit() {
    if (this.swi) {
      this.recalculateGroupSequences();
      this.moveToGroupList = this.swi.stageGroups.filter(g => g.id != this.group.id);
    }
  }

  editGroup(group: SWIStageGroup) {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.recalculateGroupSequences();
      this.save();
    }
  }

  addStage(group: SWIStageGroup) {
    this.save();
    this.router.navigate(['builder', this.swi.id, 'stagegroup', group.id, 'stages', 'new']);
  }

  editStage(stage: SWIStage) {
    if (!this.editMode) {
      this.save();
      this.router.navigate(['builder', this.swi.id, 'stagegroup', this.group.id, 'stages', stage.id]);
    }
  }

  addTool(group: SWIStageGroup) {
    this.save();
    this.router.navigate(['builder', this.swi.id, 'stagegroup', group.id, 'tools', 'new']);
  }

  editTool(group: SWIStageGroup, tool: SWITool) {
    this.save();
    this.router.navigate(['builder', this.swi.id, 'stagegroup', group.id, 'tools', tool.id]);
  }

  moveStageToGroup(stage: SWIStage, newGroup: SWIStageGroup) {
    //Add the stage to the new group and recaclulate sequences
    newGroup.stages.push(stage);
    this.recalculateStageSequences(newGroup);
    //Remove stage from the old group and recalculate sequences
    this.group.stages = this.group.stages.filter(s => s.id != stage.id);
    this.recalculateStageSequences(this.group);
  }

  deleteStage(group: SWIStageGroup, stage: SWIStage) {
    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(false)
      .keyboard(27)
      .titleHtml('<h5>Confirm Delete Stage</h5>')
      .body(`Are you sure you want to delete stage ${stage.sequence}?`)
      .okBtn('Delete Stage')
      .okBtnClass('btn btn-danger')
      .cancelBtn('Cancel')
      .cancelBtnClass('btn btn-secondary')
      .open()
      .then(dialogRef => dialogRef.result)
      .then(result => {
        this.swi.stageGroups.filter(g => g.id == group.id)[0].stages = this.swi.stageGroups.filter(g => g.id == group.id)[0].stages.filter(s => s.sequence != stage.sequence);
        this.recalculateStageSequences(group);
      })
      .catch(err => console.log("Canceled stage delete"));
  }

  recalculateStageSequences(group: SWIStageGroup) {
    for (var i = 0; i < group.stages.length; i++) {
      var element = group.stages[i];
      element.sequence = i + 1;
    }
    this.recalculateGroupSequences();
  }

  recalculateGroupSequences() {
    for (var i = 0; i < this.swi.stageGroups.length; i++) {
      var element = this.swi.stageGroups[i];
      element.sequence = i + 1;
    }
  }

  moveStageUp(group: SWIStageGroup, stage: SWIStage) {
    this.highlightStage(stage);
    let current = group.stages.filter(s => s.sequence == stage.sequence)[0];
    let above = group.stages.filter(s => s.sequence == (stage.sequence - 1))[0];
    current.sequence = stage.sequence - 1;
    above.sequence = current.sequence + 1;
    group.stages.sort((a, b) => a.sequence - b.sequence);
    this.recalculateStageSequences(group);
  }

  moveStageDown(group: SWIStageGroup, stage: SWIStage) {
    this.highlightStage(stage);
    let current = group.stages.filter(s => s.sequence == stage.sequence)[0];
    let below = group.stages.filter(s => s.sequence == (stage.sequence + 1))[0];
    current.sequence = stage.sequence + 1;
    below.sequence = current.sequence - 1;
    group.stages.sort((a, b) => a.sequence - b.sequence);
    this.recalculateStageSequences(group);
  }

  moveGroupDown(group: SWIStageGroup) {
    let current = this.swi.stageGroups.filter(s => s.sequence == group.sequence)[0];
    let below = this.swi.stageGroups.filter(s => s.sequence == group.sequence + 1)[0];
    current.sequence = group.sequence + 1;
    below.sequence = current.sequence - 1;
    this.swi.stageGroups.sort((a, b) => a.sequence - b.sequence);
    this.recalculateGroupSequences();
  }

  moveGroupUp(group: SWIStageGroup) {
    let current = this.swi.stageGroups.filter(s => s.sequence == group.sequence)[0];
    let above = this.swi.stageGroups.filter(s => s.sequence == group.sequence - 1)[0];
    current.sequence = group.sequence - 1;
    above.sequence = current.sequence + 1;
    this.swi.stageGroups.sort((a, b) => a.sequence - b.sequence);
    this.recalculateGroupSequences();
  }

  highlightStage(stage: SWIStage) {
    console.log("Selected a stage");
    this.selectedStage = stage;
    setTimeout(() => {
      console.log("DeSelected a stage");
      this.selectedStage = null;
    }, 500);
  }

  save() {
    this.onSave.emit();
  }

  stageDuplicated(group: SWIStageGroup, newStage: SWIStage) {
    this.recalculateStageSequences(group);
    this.toast.success("Stage duplicated");
    this.highlightStage(newStage);
  }

  get groupOptions() {
    return this.swi.stageGroups.filter(sg => sg.id != this.group.id);
  }
}
