import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SWIHeader, SWIStageGroup } from "app/models/app.models";

@Component({
  selector: 'swi-group-picker',
  templateUrl: './swi-group-picker.component.html',
  styleUrls: ['./swi-group-picker.component.scss']
})
export class SwiGroupPickerComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Output() onGroupSelected = new EventEmitter<SWIStageGroup>();
  selectedGroup: SWIStageGroup;

  constructor() { }

  ngOnInit() {
  }

  selectGroup(group: SWIStageGroup) {
    this.selectedGroup = group;
    this.onGroupSelected.emit(group);
  }
}
