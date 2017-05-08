import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SWIHeader } from "../../../../../app/models/app.models";

@Component({
  selector: 'swi-swi-viewer-screen',
  templateUrl: './swi-viewer-screen.component.html',
  styleUrls: ['./swi-viewer-screen.component.scss']
})
export class SwiViewerScreenComponent implements OnInit {

  swi: SWIHeader;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.swi = this.route.snapshot.data['swi'];
    this.title = this.swi.title;
  }

  ngOnInit() {
  }

  onBackButton(){
    this.router.navigate(['browser']);
  }
}
