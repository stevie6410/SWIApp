import { Component, OnInit } from '@angular/core';
import { showIndexedDbSize } from "../../core/swi-db.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Standard Work Instructions!!';

  constructor() {

  }

  ngOnInit() {
  }

  debugDBSize() {
    showIndexedDbSize();
  }

}
