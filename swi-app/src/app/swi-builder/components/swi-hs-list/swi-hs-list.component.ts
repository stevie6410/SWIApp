import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { SWIHeader } from "app/core";

@Component({
  selector: 'swi-hs-list',
  templateUrl: './swi-hs-list.component.html',
  styleUrls: ['./swi-hs-list.component.css']
})
export class SwiHsListComponent implements OnInit {

  title: string = "Health & Safety";
  @Input() swi: SWIHeader;
  @Output() onSave: EventEmitter<SWIHeader> = new EventEmitter<SWIHeader>();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  editHSItems() {
    this.onSave.emit();
    this.router.navigate(['builder', this.swi.id, 'hsitems']);
  }

}
