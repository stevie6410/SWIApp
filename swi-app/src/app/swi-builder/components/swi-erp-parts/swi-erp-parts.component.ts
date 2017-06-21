import { Component, OnInit, Input } from '@angular/core';
import { SWIHeader, SWIERPPart } from "app/core";

@Component({
  selector: 'swi-erp-parts',
  templateUrl: './swi-erp-parts.component.html',
  styleUrls: ['./swi-erp-parts.component.css']
})
export class SwiErpPartsComponent implements OnInit {

  title: string = "Linked ERP Parts";
  @Input() swi: SWIHeader;
  isAddMode: boolean = false;
  partNumber: string;
  partRevision: string;
  erpSystem: string;

  constructor() { }

  ngOnInit() {
    this.resetTextBoxes();
  }

  addPart() {
    this.isAddMode = true;
  }

  createPart() {
    let newPart: SWIERPPart = new SWIERPPart();
    newPart.erpSystem = this.erpSystem;
    newPart.partNumber = this.partNumber;
    newPart.partRevision = this.partRevision;
    if (!this.swi.swiLinkedERPParts) this.swi.swiLinkedERPParts = [];
    this.swi.swiLinkedERPParts.push(newPart);
    this.isAddMode = false;
    this.resetTextBoxes();
  }

  cancelPart() {
    this.isAddMode = false;
    this.resetTextBoxes();
  }

  deletePart(part: SWIERPPart) {
    this.swi.swiLinkedERPParts = this.swi.swiLinkedERPParts.filter(p => p.partNumber != part.partNumber);
  }

  private resetTextBoxes() {
    this.erpSystem = "E1";
    this.partNumber = "";
    this.partRevision = "";
  }

}
