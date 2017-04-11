import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { SWIHeader, SWIHSItem } from "../../../../models/app.models";
import { SWIHSItemService } from "../../services/swi-hs.service";

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
    private hsItemsService: SWIHSItemService,
    private router: Router
  ) { }

  ngOnInit() {
    //Listen for HS Icon changes
    this.hsItemsService.itemSelection.subscribe((items) => {
      console.log(items);
    });
  }
  
  editHSItems() {
    this.router.navigate(['swibuilder', this.swi.filename, 'hsitems']);
  }

}
