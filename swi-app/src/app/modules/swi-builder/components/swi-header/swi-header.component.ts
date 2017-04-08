import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SWIHeader } from '../../../../models/app.models';

@Component({
  selector: 'swi-header',
  templateUrl: './swi-header.component.html',
  styleUrls: ['./swi-header.component.css']
})
export class SwiHeaderComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Output() onSave: EventEmitter<SWIHeader> = new EventEmitter<SWIHeader>();

  title: string = "SWI Header";

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.onSave.emit(this.swi);
  }

  getImageFromKey(key: string): string {
    let result = this.swi.swiImages.filter(i => i.key == key)[0];
    if (result) return result.value;
  }
}
