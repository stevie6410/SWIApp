import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'swi-card',
  templateUrl: './swi-card.component.html',
  styleUrls: ['./swi-card.component.css']
})
export class SwiCardComponent implements OnInit {

  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
