import { Directive, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";

import { ToastsManager } from "ng2-toastr";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { SWIHeader, SWIFileService, hasChanges, SWITool, SWIStageGroup } from "app/core";


@Directive({
  selector: '[swiDeleteTool]'
})
export class DeleteToolDirective {

  @Input() tool: SWITool;
  @Input() group: SWIStageGroup;
  @Output() deleted = new EventEmitter<void>();

  constructor(
    private router: Router,
    public modal: Modal
  ) {
  }

  @HostListener('click') onClick() {
    this.deleteTool();
  }

  deleteTool() {
    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(false)
      .keyboard(27)
      .titleHtml('<h5>Delete Tool</h5>')
      .body(`
          Are you sure you want to delete this tool?
          `)
      .okBtn('Delete Tool')
      .okBtnClass('btn btn-danger')
      .cancelBtn('Cancel')
      .cancelBtnClass('btn btn-secondary')
      .open()
      .then(dialogRef => dialogRef.result)
      .then(result => {
        this.group.tools = this.group.tools.filter(t => t.id != this.tool.id);
        this.deleted.emit();
      })
      .catch(err => console.log('Canceled'));
  }
}
