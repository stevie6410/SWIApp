import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SWIHeader, SWIStage } from '../../../../models/app.models';


@Component({
  selector: 'swi-stages-list',
  templateUrl: './swi-stages-list.component.html',
  styleUrls: ['./swi-stages-list.component.css']
})
export class SwiStagesListComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Input() filename: string;
  title: string = "Stages";
  stage: SWIStage;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  getImageFromKey(key: string): string {
    return this.swi.swiImages.filter(i => i.key == key)[0].value;
  }

  editStage(stage: SWIStage) {
    console.log("Edit Stage: ", stage);
    this.stage = stage;
    this.router.navigate(['swibuilder', this.filename, 'stages', stage.sequence]);
  }

  save() {

  }

}
