import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StandardTool } from "app/core";
import { RepoStandardToolingService, CreateStandardTool, ImageStoreService, GUID } from "app/core";

@Component({
  selector: 'swi-std-tooling-form',
  templateUrl: './std-tooling-form.component.html',
  styleUrls: ['./std-tooling-form.component.scss']
})
export class StdToolingFormComponent implements OnInit {

  tool: StandardTool;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toolStore: RepoStandardToolingService,
    private imageStore: ImageStoreService
  ) {
    //Check to see if this is a new or edit route
    if (route.snapshot.url.map(u => u.path).includes("new")) {
      //This is a new Std Tool       
      this.tool = new StandardTool();
    } else {
      //This is an existing Std tool
      this.tool = this.route.snapshot.data['stdTool'];
      if (this.tool) console.warn("No StdTool was found in the route data");
    }

  }

  ngOnInit() {
  }

  async save() {
    if (!this.tool.id) {
      //This is a new tool becuase it does not have an ID, so convert to CreateTool model and cretae
      await this.createNew();
    } else {
      //This is an existing tool, push the full tool model for an update
      await this.saveExisting();
    }
    console.log("Saved!");
    this.navBack();
  }

  async createNew() {
    let createTool = new CreateStandardTool;
    createTool.carePoint = this.tool.carePoint;
    createTool.hasCarePoint = this.tool.hasCarePoint;
    createTool.image = this.tool.image;
    createTool.name = this.tool.name;
    createTool.swiMasterId = (this.tool.swiMaster) ? this.tool.swiMaster.id : null;

    console.log("Create Tool Model", createTool);

    this.tool = await this.toolStore.create(createTool).toPromise();
  }

  async saveExisting() {
    let result = await this.toolStore.update(this.tool).toPromise();
    console.log("Save Result", result);
    this.tool = result;
  }

  async getImage() {
    this.tool.image = await this.imageStore.callCamera(this.tool.image, new GUID().value);
    //Get the image from the store and inject the raw image into the model
    let rawImage = await this.imageStore.get(this.tool.image, false);
    this.tool.image = rawImage;
  }

  navBack() {
    this.router.navigate(['repo', 'tooling', 'search']);
  }

}
