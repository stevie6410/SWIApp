import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SWIHeader, SWIStage } from '../../../../models/app.models';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { SWIFileService } from "../../../../../app/services/swi-file.service";


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
  editMode: boolean = false;

  constructor(
    private router: Router,
    public swiService: SWIFileService
  ) { }

  ngOnInit() {
  }

  getImageFromKey(key: string): string {
    try {
      if (!key) return ImagePlaceholder;
      return this.swi.swiImages.filter(i => i.key == key)[0].value;
    } catch (error) {
      return ImagePlaceholder;
    }
  }

  editStage(stage: SWIStage) {
    if (!this.editMode) {
      this.stage = stage;
      this.router.navigate(['builder', this.swi.id, 'stages', stage.sequence]);
    }
  }

  editStages() {
    this.editMode = !this.editMode;
  }

  addStage() {
    this.stage = new SWIStage();
    this.stage.sequence = this.swi.swiStages.length + 1;
    console.log(`New stage created: ${this.stage}`);
    this.swi.swiStages.push(this.stage);
    this.save();
    this.editStage(this.stage);
  }

  moveUp(stage: SWIStage) {
    let current = this.swi.swiStages.filter(s => s.sequence == stage.sequence)[0];
    let above = this.swi.swiStages.filter(s => s.sequence == (stage.sequence - 1))[0];
    current.sequence = stage.sequence - 1;
    above.sequence = current.sequence + 1;
  }

  moveDown(stage: SWIStage) {
    let current = this.swi.swiStages.filter(s => s.sequence == stage.sequence)[0];
    let below = this.swi.swiStages.filter(s => s.sequence == (stage.sequence + 1))[0];
    current.sequence = stage.sequence + 1;
    below.sequence = current.sequence - 1;
  }

  save() {
    this.onSave.emit();
  }

}
