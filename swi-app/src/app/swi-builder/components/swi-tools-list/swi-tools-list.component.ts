import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { SWIHeader, SWIStageGroup, SWITool, SWIFileService, ImageStoreService } from "app/core";


@Component({
  selector: 'swi-tools-list',
  templateUrl: './swi-tools-list.component.html',
  styleUrls: ['./swi-tools-list.component.css']
})
export class SwiToolsListComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Input() group: SWIStageGroup;
  @Output() onSave = new EventEmitter<void>();
  title: string = "Tooling";
  tools: SWITool[];

  constructor(
    private router: Router,
    public swiService: SWIFileService,
    public imageStore: ImageStoreService
  ) { }

  ngOnInit() {
    if (this.group) {
      this.tools = this.group.tools;
    } else {
      this.tools = this.swi.swiTools;
    }
  }

  addTool() {
    this.save();
    this.router.navigate(['builder', this.swi.id, 'tools', 'new']);
  }

  editTool(tool: SWITool) {
    this.save();
    this.router.navigate(['builder', this.swi.id, 'tools', tool.id]);
  }

  save() {
    this.onSave.emit();
  }

}