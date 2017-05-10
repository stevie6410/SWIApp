import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SWIHeader } from "../../../../../app/models/app.models";

@Component({
  selector: 'swi-swi-manager-screen',
  templateUrl: './swi-manager-screen.component.html',
  styleUrls: ['./swi-manager-screen.component.scss']
})
export class SwiManagerScreenComponent implements OnInit {

  swi: SWIHeader;
  title: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.swi = this.route.snapshot.data['swi'];
    this.title = "SWI Manager - " + this.swi.title;
  }

  ngOnInit() {
  }

  navBack(){
    this.router.navigate(['browser']);
  }

  editSWI(){
    this.router.navigate(['builder', this.swi.id]);
  }

  viewSWI(){
    this.router.navigate(['viewer', this.swi.id]);
  }

}
