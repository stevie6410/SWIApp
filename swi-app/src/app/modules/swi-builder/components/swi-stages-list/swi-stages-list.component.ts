import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SWIHeader, SWIStage, SWIStageGroup } from '../../../../models/app.models';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { SWIFileService } from "../../../../../app/services/swi-file.service";
import { ImageStoreService } from '../../../../services/image-store.service';
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'swi-stages-list',
  templateUrl: './swi-stages-list.component.html',
  styleUrls: ['./swi-stages-list.component.css']
})
export class SwiStagesListComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Output() onSave = new EventEmitter<void>();
  filename: string;
  title: string = "Stages";
  stage: SWIStage;
  selectedSequence: number = 1;
  editMode: boolean = false;
  selectedStage: SWIStage;

  constructor(
    private router: Router,
    public swiService: SWIFileService,
    public imageStore: ImageStoreService,
    public overlay: Overlay,
    public vcr: ViewContainerRef,
    public modal: Modal,
    private toast: ToastsManager,
    private changes: ChangeDetectorRef
  ) {
    overlay.defaultViewContainer = vcr;
  }
  ngOnInit() {
  }

  editStage(group: SWIStageGroup, stage: SWIStage) {
    if (!this.editMode) {
      this.save();
      this.stage = stage;
      this.router.navigate(['builder', this.swi.id, 'stagegroup', group.id, 'stages', stage.id]);
    }
  }

  editStages(group: SWIStageGroup) {
    this.editMode = !this.editMode;
    if (!this.editMode) this.save();
  }

  addStage(group: SWIStageGroup) {
    this.save();
    this.router.navigate(['builder', this.swi.id, 'stagegroup', group.id, 'stages', 'new']);
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

  stageDuplicated(group:SWIStageGroup, newStage: SWIStage) {
    this.recalculateSequences(group);
    this.toast.success("Stage duplicated");
    this.highlightStage(newStage);
  }

}
