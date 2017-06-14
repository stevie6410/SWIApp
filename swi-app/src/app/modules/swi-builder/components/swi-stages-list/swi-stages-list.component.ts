import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SWIHeader, SWIStage } from '../../../../models/app.models';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { SWIFileService } from "../../../../../app/services/swi-file.service";
import { ImageStoreService } from '../../../../services/image-store.service';
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { DragulaService } from "ng2-dragula";
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

  constructor(
    private router: Router,
    public swiService: SWIFileService,
    public imageStore: ImageStoreService,
    public overlay: Overlay,
    public vcr: ViewContainerRef,
    public modal: Modal,
    private dragulaService: DragulaService,
    private toast: ToastsManager
  ) {
    overlay.defaultViewContainer = vcr;

    const bag: any = this.dragulaService.find('stages-bag');
    if (bag !== undefined) this.dragulaService.destroy('stages-bag');
    dragulaService.setOptions('stages-bag', {
      moves: (el, source, handle, sibling) => el.classList.contains('draggable')
    });

    dragulaService.dropModel.subscribe((value, err, complete) => {
      this.recalculateSequences();
    })

  }
  ngOnInit() {
  }

  editStage(stage: SWIStage) {
    if (!this.editMode) {
      this.save();
      this.stage = stage;
      this.router.navigate(['builder', this.swi.id, 'stages', stage.sequence]);
    }
  }

  editStages() {
    this.editMode = !this.editMode;
  }

  addStage() {
    // this.stage = new SWIStage();
    // this.stage.sequence = this.swi.swiStages.length + 1;
    // console.log(`New stage created: ${this.stage}`);
    // this.swi.swiStages.push(this.stage);
    // this.save();
    // this.editStage(this.stage);
    this.save();
    this.router.navigate(['builder', this.swi.id, 'stages', 0]);
  }

  deleteStage(stage: SWIStage) {
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
        this.recalculateSequences();
      })
      .catch(err => console.log("Canceled stage delete"));
  }

  recalculateSequences() {
    for (var i = 0; i < this.swi.swiStages.length; i++) {
      var element = this.swi.swiStages[i];
      element.sequence = i + 1;
    }
    this.save();
  }

  moveUp(stage: SWIStage) {
    let current = this.swi.swiStages.filter(s => s.sequence == stage.sequence)[0];
    let above = this.swi.swiStages.filter(s => s.sequence == (stage.sequence - 1))[0];
    current.sequence = stage.sequence - 1;
    above.sequence = current.sequence + 1;
    this.swi.swiStages.sort((a, b) => a.sequence - b.sequence);
    this.recalculateSequences();
  }

  moveDown(stage: SWIStage) {
    let current = this.swi.swiStages.filter(s => s.sequence == stage.sequence)[0];
    let below = this.swi.swiStages.filter(s => s.sequence == (stage.sequence + 1))[0];
    current.sequence = stage.sequence + 1;
    below.sequence = current.sequence - 1;
    this.swi.swiStages.sort((a, b) => a.sequence - b.sequence);
    this.recalculateSequences();
  }

  save() {
    this.onSave.emit();
  }

  stageDuplicated(stage: SWIStage) {
    this.recalculateSequences();
    this.toast.success("Stage duplicated");
  }

}
