import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SWIHeader, SWIStage } from '../../../../models/app.models';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";


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

  constructor(
    private router: Router
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
    console.log("Edit Stage: ", stage);
    this.stage = stage;
    this.router.navigate(['swibuilder', this.swi.filename, 'stages', stage.sequence]);
  }

  addStage() {
    this.stage = new SWIStage();
    this.stage.sequence = this.swi.swiStages.length + 1;
    console.log(`New stage created: ${this.stage}`);
    this.swi.swiStages.push(this.stage);
    this.save();
    this.editStage(this.stage);
  }

  save() {
    this.onSave.emit();
  }

}
