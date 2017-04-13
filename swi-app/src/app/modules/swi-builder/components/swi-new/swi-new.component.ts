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
    let filename = new GUID().value + '.swi';
    console.log(`Creating a new SWI file ${filename}`);
    this.swi = new SWIHeader(this.swiName);
    this.swi.filename = filename;
    this.swi.category = this.category;
    console.log(`Going to create this swi: `, this.swi);
    this.swiService.saveFile(this.swi.filename, this.swi)
      .then((result) => {
        console.log(`${result} was created`, `File Saved!`);
        this.toast.success(`${result} was saved`, `File Saved!`);
        this.router.navigate(['swibuilder', this.swi.filename]);
      })
      .catch((err) => {
        console.log("Error saving file: ", err);
        this.toast.error(`${filename} could not be created`, "Error saving file!");
      });
  }

  test() {
    console.log(this.category);
  }
}
