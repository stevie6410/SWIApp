import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'swi-new',
  templateUrl: './swi-new.component.html',
  styleUrls: ['./swi-new.component.css']
})
export class SwiNewComponent implements OnInit {

  swiName: string;
  title: string = "Create New SWI";

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  createSWI() {
    this.swiName = this.swiName;
    this.router.navigate(['swibuilder', this.swiName]);
  }

}
