import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { SWIHeader, GUID } from "../../../../../app/models/app.models";
import { ToastsManager } from 'ng2-toastr';
import { SWIFileService } from '../../../../services/swi-file.service';

@Component({
  selector: 'swi-new',
  templateUrl: './swi-new.component.html',
  styleUrls: ['./swi-new.component.css']
})
export class SwiNewComponent implements OnInit {

  title: string = "Create New SWI";
  swiName: string;
  category: string;
  swi: SWIHeader;

  constructor(
    private router: Router,
    private vcr: ViewContainerRef,
    private toast: ToastsManager,
    private swiService: SWIFileService
  ) { }

  ngOnInit() {
  }

  createSWI() {
    this.swi = new SWIHeader(this.swiName);
    this.swi.category = this.category;
    console.log(`Going to create this swi: `, this.swi);
    this.swiService.createSWI(this.swi)
      .then((result) => {
        console.log(`${this.swiName} was created`, `File Saved!`);
        this.toast.success(`${this.swiName} was saved`, `File Saved!`);
        this.router.navigate(['swibuilder', this.swi.id]);
      })
      .catch((err) => {
        console.log("Error saving file: ", err);
        this.toast.error(`${this.swi.id} could not be created`, "Error saving file!");
      });
  }

  test() {
    console.log(this.category);
  }
}
