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

  constructor(
  ) { }
  ngOnInit() {
  }

  save() {
    this.onSave.emit();
  }

}
