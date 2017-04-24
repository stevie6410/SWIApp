import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SWIHeader, SWITool } from "../../../../../app/models/app.models";
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { Router } from "@angular/router";

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  getImageFromKey(key: string): string {
    try {
      if (!key) return ImagePlaceholder;
      return this.swi.swiImages.filter(i => i.key == key)[0].value;
    } catch (error) {
      return ImagePlaceholder;
    }
  }

  addTool() {
    this.router.navigate(['swibuilder', this.swi.id, 'tools', 'new']);
  }

  editTool(tool: SWITool) {
    this.router.navigate(['swibuilder', this.swi.id, 'tools', tool.id]);
  }

  save() {
    this.onSave.emit();
  }

}
