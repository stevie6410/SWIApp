import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

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
