import { Directive, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";

import { ToastsManager } from "ng2-toastr";
import { SWIFileService, SWIStage, SWIHeader, SWIStageGroup } from "app/core";


@Directive({
  selector: '[duplicateStage]'
})
export class DuplicateStageDirective {

  @Input() swi: SWIHeader;
  @Input() stage: SWIStage;
  @Input() group: SWIStageGroup;
  @Output() onDuplicated = new EventEmitter<SWIStage>();

  constructor(
    private router: Router,
    private toast: ToastsManager,
    private swiService: SWIFileService
  ) { }

  @HostListener('click') onClick() {
    this.duplicateStage();
  }

  duplicateStage() {
    let newStage: SWIStage = JSON.parse(JSON.stringify(this.stage));
    newStage.sequence = this.group.stages.length + 1;
    newStage.summary = `Copy of stage ${this.stage.sequence}`;
    this.group.stages.push(newStage);
    this.onDuplicated.emit(newStage);
  }
}
