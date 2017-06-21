import { Component, OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { CameraService } from "../../../camera/services/camera.service";
import { SWIFileService, ImageStoreService, SWITool, SWIHeader, SWIStageGroup, generateHash } from "app/core";

@Component({
  selector: 'swi-tool-edit',
  templateUrl: './swi-tool-edit.component.html',
  styleUrls: ['./swi-tool-edit.component.css']
})
export class SwiToolEditComponent implements OnInit {

  toolId: string;
  tool: SWITool;
  swi: SWIHeader;
  group: SWIStageGroup;
  initialState: number;
  title: string = "SWI Builder";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastsManager,
    private cameraService: CameraService,
    public swiService: SWIFileService,
    public imageStore: ImageStoreService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.swi = this.route.snapshot.data['swi'];
      this.initialState = generateHash(JSON.stringify(this.swi));

      this.group = this.swi.stageGroups.filter(sg => sg.id == params['groupid'])[0];

      this.toolId = params['toolid'];
      if (this.toolId == 'new') {
        //Create a new tool
        this.tool = new SWITool('');
        this.toolId = this.tool.id;
        if (this.group) {
          this.group.tools.push(this.tool);
        } else {
          this.swi.swiTools.push(this.tool);
        }
      } else {
        //Retreie the existing tool
        if (this.group) {
          this.tool = this.group.tools.filter(t => t.id == this.toolId)[0];
        } else {
          this.tool = this.swi.swiTools.filter(t => t.id == this.toolId)[0];
        }
      }

      this.title = `SWI Builder - ${this.swi.title} - Edit Tool`;
    });
  }

  backButtonClick() {
    this.save(true);
  }

  async getImage() {
    this.tool.image = await this.imageStore.callCamera(this.tool.image, this.swi.id);
  }

  deleteTool() {
    if (this.group) {
      this.group.tools = this.group.tools.filter(t => t.id != this.tool.id);
    } else {
      this.swi.swiTools = this.swi.swiTools.filter(t => t.id != this.tool.id);
    }
    this.save(true);
  }

  save(navBack: Boolean) {
    if (generateHash(JSON.stringify(this.swi)) == this.initialState) {
      console.log("No changes");
      if (navBack) this.router.navigate(['builder', this.swi.id]);
    } else {
      //Save the file and navigate back to the SWI Builder screen
      this.swiService.update(this.swi)
        .then((result) => {
          console.log(`${this.swi.id} was saved.`);
          if (navBack) this.router.navigate(['builder', this.swi.id]);
        })
        .catch((err) => {
          console.log("Error saving file: ", err);
          this.toast.error(`${this.swi.title} could not be created`, "Error saving file!");
        })
    }
  }
}
