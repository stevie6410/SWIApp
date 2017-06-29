import { Directive, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";

import { ToastsManager } from "ng2-toastr";
import { SWIHeader, SWIFileService, hasChanges, SWIStageGroup } from "app/core";


@Directive({
  selector: '[swiSaveChanges]'
})
export class SaveChangesDirective {

  @Input() navBack: boolean = true;
  @Input() swi: SWIHeader;
  @Input() initialState: number;
  @Input() newStage: boolean = false;
  @Input() group: SWIStageGroup = null;
  @Output() saved = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private toast: ToastsManager,
    private swiService: SWIFileService
  ) { }

  @HostListener('click') onClick() {
    this.save();
  }

  async save() {
    try {
      if (hasChanges(this.swi, this.initialState)) await this.swiService.update(this.swi);
    } catch (error) {
      console.log("Error saving file: ", error);
      this.toast.error(`${this.swi.title} could not be created`, "Error saving file!");
    }
    this.toast.success(`File Saved!`);
    this.saved.emit();
    if (this.navBack) this.navigateBack();
    if (this.newStage) this.navigateNewStage();
  }

  navigateBack() {
    this.router.navigate(['builder', this.swi.id]);
  }

  navigateNewStage() {
    console.log(this.group);
    if (this.group) {
      this.router.navigate(['builder', this.swi.id, 'stagegroup', this.group.id, 'stages', 'new']);
    } else {
      console.log("Could not navigate to new stage as the group was not provided");
    }
  }

}
