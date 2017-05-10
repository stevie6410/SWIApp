import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SWIHeader, SWITool } from "../../../../../app/models/app.models";
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { Router } from "@angular/router";
import { SWIFileService } from "../../../../services/swi-file.service";

@Component({
  selector: 'swi-tools-list',
  templateUrl: './swi-tools-list.component.html',
  styleUrls: ['./swi-tools-list.component.css']
})
export class SwiToolsListComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Output() onSave = new EventEmitter<void>();
  title: string = "Tooling";

  constructor(
    private router: Router,
    public swiService: SWIFileService
  ) { }

  ngOnInit() {
  }

  addTool() {
    this.router.navigate(['builder', this.swi.id, 'tools', 'new']);
  }

  editTool(tool: SWITool) {
    this.router.navigate(['builder', this.swi.id, 'tools', tool.id]);
  }

  save() {
    this.onSave.emit();
  }

}
