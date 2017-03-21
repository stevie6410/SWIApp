import { Component, OnInit, Input, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'swi-page',
  templateUrl: './swi-page.component.html',
  styleUrls: ['./swi-page.component.scss']
})
export class SwiPageComponent implements OnInit {

  @Input() title: string;
  @Input() backButton: boolean = true;

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  navBack() {
    this.location.back();
  }

}
