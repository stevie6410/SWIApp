import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from "angular2-modal/plugins/bootstrap";
import { ToastsManager } from 'ng2-toastr';
import { SWIHeader } from "app/core";

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
