import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { SWIStage } from '../../../../models/app.models';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'swi-stages-list',
  templateUrl: './swi-stages-list.component.html',
  styleUrls: ['./swi-stages-list.component.css']
})
export class SwiStagesListComponent implements OnInit {

  @Input() swi;
  title: string = "Stages";
  stage: SWIStage;

  @ViewChild('swiStageModal') public swiStageModal: ModalDirective;

  constructor(
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
  }

  getImageFromKey(key: string): string {
    return this.swi.swiImages.filter(i => i.key == key)[0].value;
  }

  editStage(stage: SWIStage) {
    console.log("Edit Stage: ", stage);
    this.stage = stage;
  }
}
