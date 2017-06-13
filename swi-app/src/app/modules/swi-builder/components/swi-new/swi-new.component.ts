import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { SWIHeader, GUID } from "../../../../../app/models/app.models";
import { ToastsManager } from 'ng2-toastr';
import { SWIFileService } from '../../../../services/swi-file.service';
import { RepoDocsService } from '../../../../services/repo-docs.service';
import { SWIMaster, CreateSWIMaster } from "app/models/repo.models";

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
    private swiService: SWIFileService,
    private repoDocs: RepoDocsService
  ) { }

  ngOnInit() {
  }

  async createSWI() {

    console.log("Create SWI");

    //Create a blank SWIHeader
    this.swi = new SWIHeader(this.swiName);
    this.swi.category = this.category;

    try {
      //Run the create swi service call
      await this.swiService.createSWI(this.swi);

      //Log the successfull result
      console.log(`${this.swiName} was created`, `File Saved!`);
      this.toast.success(`${this.swiName} was saved`, `File Saved!`);

      //Navigate to the SWIBuilder module
      this.router.navigate(['builder', this.swi.id]);

    } catch (error) {
      console.log("Error saving file: ", error);
      this.toast.error(`${this.swi.id} could not be created`, "Error saving file!");
    }
  }
}
