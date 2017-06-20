import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { SWIHeader, SWIStageGroup, SWIStage } from "app/models/app.models";
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { ToastsManager } from "ng2-toastr";

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

  constructor(
    private router: Router,
    public overlay: Overlay,
    public vcr: ViewContainerRef,
    public modal: Modal,
    private toast: ToastsManager
  ) {
    overlay.defaultViewContainer = vcr;
  }

  ngOnInit() {
  }

  editGroup(group: SWIStageGroup) {
    this.editMode = !this.editMode;
    if (!this.editMode) this.save();
  }

  addStage(group: SWIStageGroup) {
    this.save();
    this.router.navigate(['builder', this.swi.id, 'stagegroup', group.id, 'stages', 'new']);
  }

  editStage(group: SWIStageGroup, stage: SWIStage) {
    if (!this.editMode) {
      this.save();
      this.router.navigate(['builder', this.swi.id, 'stagegroup', group.id, 'stages', stage.id]);
    }
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
        this.swi.swiStages = this.swi.swiStages.filter(s => s.sequence != stage.sequence);
        this.recalculateSequences(group);
      })
      .catch(err => console.log("Canceled stage delete"));
  }

  recalculateSequences(group: SWIStageGroup) {
    for (var i = 0; i < group.stages.length; i++) {
      var element = group.stages[i];
      element.sequence = i + 1;
    }
  }

  moveUp(group: SWIStageGroup, stage: SWIStage) {
    this.highlightStage(stage);
    let current = group.stages.filter(s => s.sequence == stage.sequence)[0];
    let above = group.stages.filter(s => s.sequence == (stage.sequence - 1))[0];
    current.sequence = stage.sequence - 1;
    above.sequence = current.sequence + 1;
    group.stages.sort((a, b) => a.sequence - b.sequence);
    this.recalculateSequences(group);
  }

  moveDown(group: SWIStageGroup, stage: SWIStage) {
    this.highlightStage(stage);
    let current = group.stages.filter(s => s.sequence == stage.sequence)[0];
    let below = group.stages.filter(s => s.sequence == (stage.sequence + 1))[0];
    current.sequence = stage.sequence + 1;
    below.sequence = current.sequence - 1;
    group.stages.sort((a, b) => a.sequence - b.sequence);
    this.recalculateSequences(group);
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
    this.recalculateSequences(group);
    this.toast.success("Stage duplicated");
    this.highlightStage(newStage);
  }

}
