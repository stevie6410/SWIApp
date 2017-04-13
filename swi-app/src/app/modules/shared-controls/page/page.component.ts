import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  @Input() title: string;
  @Input() backButton: boolean = true;
  @Output() onBackButtonClick = new EventEmitter<void>();

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  navBack() {
    this.onBackButtonClick.emit();
    this.location.back();
  }

}
