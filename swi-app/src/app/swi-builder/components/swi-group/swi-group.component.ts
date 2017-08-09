import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { ToastsManager } from "ng2-toastr";
import { SWIHeader, SWIStageGroup, SWIStage, SWITool, recalculateStageSequences, recalculateGroupSequences } from "app/core";


@Component({
  selector: 'swi-group',
  templateUrl: './swi-group.component.html',
  styleUrls: ['./swi-group.component.scss']
})
export class SwiGroupComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Input() group: SWIStageGroup;
  @Output() onSave = new EventEmitter<void>();

  editMode = false;
  selectedStage: SWIStage;
  moveToGroupList: SWIStageGroup[];

  constructor(
    private router: Router,
    public modal: Modal,
    private toast: ToastsManager
  ) { }

  ngOnInit() {
    if (this.swi) {
      recalculateGroupSequences(this.swi);
      this.swi.stageGroups.forEach(grp => recalculateStageSequences(grp));
      this.moveToGroupList = this.swi.stageGroups.filter(g => g.id !== this.group.id);
    }
  }

  editGroup(group: SWIStageGroup) {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      recalculateGroupSequences(this.swi);
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
    if (!this.editMode) {
      this.save();
      this.router.navigate(['builder', this.swi.id, 'stagegroup', group.id, 'tools', tool.id]);
    }
  }

  moveStageToGroup(stage: SWIStage, newGroup: SWIStageGroup) {
    // Add the stage to the new group and recaclulate sequences
    stage.sequence = newGroup.stages.length + 1;
    newGroup.stages.push(stage);
    recalculateStageSequences(newGroup);
    // Remove stage from the old group and recalculate sequences
    this.group.stages = this.group.stages.filter(s => s.id !== stage.id);
    recalculateStageSequences(this.group);
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
        this.swi.stageGroups.filter(g => g.id === group.id)[0].stages = this.swi.stageGroups
          .filter(g => g.id === group.id)[0].stages
          .filter(s => s.sequence !== stage.sequence);
        recalculateStageSequences(group);
      })
      .catch(err => console.log("Canceled stage delete"));
  }

  moveStageUp(group: SWIStageGroup, stage: SWIStage) {
    const above = group.stages.filter(s => s.sequence === (stage.sequence - 1))[0];
    console.log("target stage", stage);
    console.log("above stage", above);
    if (above && stage) {
      this.highlightStage(stage);
      above.sequence = stage.sequence + 1;
      stage.sequence = stage.sequence - 1;
      group.stages.sort((a, b) => a.sequence - b.sequence);
      recalculateStageSequences(group);
    }
  }

  moveStageDown(group: SWIStageGroup, stage: SWIStage) {
    const current = group.stages.filter(s => s.sequence === stage.sequence)[0];
    const below = group.stages.filter(s => s.sequence === (stage.sequence + 1))[0];
    if (current && below) {
      this.highlightStage(stage);
      current.sequence = stage.sequence + 1;
      below.sequence = current.sequence - 1;
      group.stages.sort((a, b) => a.sequence - b.sequence);
      recalculateStageSequences(group);
    }
  }

  moveGroupDown(group: SWIStageGroup) {
    const current = this.swi.stageGroups.filter(s => s.sequence === group.sequence)[0];
    const below = this.swi.stageGroups.filter(s => s.sequence === group.sequence + 1)[0];
    current.sequence = group.sequence + 1;
    below.sequence = current.sequence - 1;
    this.swi.stageGroups.sort((a, b) => a.sequence - b.sequence);
    recalculateGroupSequences(this.swi);
  }

  moveGroupUp(group: SWIStageGroup) {
    const current = this.swi.stageGroups.filter(s => s.sequence === group.sequence)[0];
    const above = this.swi.stageGroups.filter(s => s.sequence === group.sequence - 1)[0];
    current.sequence = group.sequence - 1;
    above.sequence = current.sequence + 1;
    this.swi.stageGroups.sort((a, b) => a.sequence - b.sequence);
    recalculateGroupSequences(this.swi);
  }

  highlightStage(stage: SWIStage) {
    console.log("Selected a stage");
    this.selectedStage = stage;
    setTimeout(() => {
      console.log("DeSelected a stage");
      this.selectedStage = null;
    }, 500);
  }

  deleteGroup(group: SWIStageGroup) {
    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(false)
      .keyboard(27)
      .titleHtml('<h5>Confirm Delete Group</h5>')
      .body(`Are you sure you want to delete group ${group.name}?`)
      .okBtn('Delete Group')
      .okBtnClass('btn btn-danger')
      .cancelBtn('Cancel')
      .cancelBtnClass('btn btn-secondary')
      .open()
      .then(dialogRef => dialogRef.result)
      .then(result => {
        this.swi.stageGroups = this.swi.stageGroups.filter(g => g.id !== group.id);
        recalculateGroupSequences(this.swi);
        this.toast.warning(`Group ${group.name} has been deleted`);
      })
      .catch(err => console.log("Canceled stage delete"));
  }

  save() {
    this.onSave.emit();
  }

  stageDuplicated(group: SWIStageGroup, newStage: SWIStage) {
    recalculateStageSequences(group);
    this.toast.success("Stage duplicated");
    this.highlightStage(newStage);
  }

  get groupOptions() {
    return this.swi.stageGroups.filter(sg => sg.id !== this.group.id);
  }
}
