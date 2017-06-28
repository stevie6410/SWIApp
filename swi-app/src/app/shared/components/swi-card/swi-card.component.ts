import { Component, OnInit, Input,  ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'swi-card',
  templateUrl: './swi-card.component.html',
  styleUrls: ['./swi-card.component.scss']
})
export class SwiCardComponent implements OnInit {

  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
