import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SWITool, SWIStageGroup, SWIHeader } from "app/core";


@Component({
  selector: 'swi-tools-list-view',
  templateUrl: './swi-tools-list-view.component.html',
  styleUrls: ['./swi-tools-list-view.component.scss']
})
export class SwiToolsListViewComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Input() group: SWIStageGroup;
  @Input() editMode: boolean = false;
  @Output() selected = new EventEmitter<SWITool>();
  @Output() save = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onSelected(tool: SWITool) {
    if (!this.editMode) this.selected.emit(tool);
  }

  onDeleted() {
    this.save.emit();
  }

  moveToolToGroup(tool: SWITool, newGroup: SWIStageGroup) {
    newGroup.tools.push(tool);
    this.group.tools = this.group.tools.filter(t => t.id != tool.id);
  }

  get groupOptions() {
    return this.swi.stageGroups.filter(sg => sg.id != this.group.id);
  }
}
