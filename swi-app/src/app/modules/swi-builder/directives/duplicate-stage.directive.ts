import { Directive, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";

import { ToastsManager } from "ng2-toastr";

import { SWIFileService } from "../../../services/swi-file.service";
import { hasChanges, SWIHeader, SWIStage } from "../../../models/app.models";

@Directive({
  selector: '[duplicateStage]'
})
export class DuplicateStageDirective {

  @Input() swi: SWIHeader;
  @Input() stage: SWIStage;
  @Output() onDuplicated = new EventEmitter<void>();

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
    newStage.sequence = this.swi.swiStages.length + 1;
    newStage.summary = `Copy of stage ${this.stage.sequence}`;
    this.swi.swiStages.push(newStage);
    this.onDuplicated.emit();
  }
}
