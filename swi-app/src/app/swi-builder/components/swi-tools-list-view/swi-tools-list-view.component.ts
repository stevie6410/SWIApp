import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SWITool } from "app/core";


@Component({
  selector: 'swi-tools-list-view',
  templateUrl: './swi-tools-list-view.component.html',
  styleUrls: ['./swi-tools-list-view.component.scss']
})
export class SwiToolsListViewComponent implements OnInit {

  @Input() tools: SWITool[];
  @Output() onSelected = new EventEmitter<SWITool>();

  constructor() { }

  ngOnInit() {
  }
}
