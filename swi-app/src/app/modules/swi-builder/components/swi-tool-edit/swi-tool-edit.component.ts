import { Component, OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SWITool, SWIHeader, SWIImage, generateHash } from "../../../../../app/models/app.models";
import { ToastsManager } from 'ng2-toastr';
import { SWIFileService } from "../../../../services/swi-file.service";
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";

@Component({
  selector: 'swi-tool-edit',
  templateUrl: './swi-tool-edit.component.html',
  styleUrls: ['./swi-tool-edit.component.css']
})
export class SwiToolEditComponent implements OnInit {

  toolId: string;
  tool: SWITool;
  swi: SWIHeader;
  initialState: number;
  title: string = "SWI Builder";
  isFetchingImage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private vcr: ViewContainerRef,
    private toast: ToastsManager,
    private router: Router,
    public swiService: SWIFileService,
    private changeDetector: ChangeDetectorRef
  ) {
    toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.swi = this.route.snapshot.data['swi'];
      this.initialState = generateHash(JSON.stringify(this.swi));

      this.toolId = params['toolid'];
      if (this.toolId == 'new') {
        this.tool = new SWITool('');
        this.toolId = this.tool.id;
        this.swi.swiTools.push(this.tool);
      } else {
        this.tool = this.swi.swiTools.filter(t => t.id == this.toolId)[0];
      }

      console.log("ToolID: ", this.toolId);
      console.log("Tools in SWI: ", this.swi.swiTools);
      console.log("Tool: ", this.tool);
      this.title = `SWI Builder - ${this.swi.title} - Edit Tool`;
    });
  }

  backButtonClick() {
    this.save(true);
  }

  addImage() {
    this.isFetchingImage = true;
  }

  imageSelected(image: string) {
    console.log('Image Selected from edit component');
    let newSwiImage: SWIImage = new SWIImage(image);
    this.swi.swiImages.push(newSwiImage);
    this.tool.image = newSwiImage.key;
    this.isFetchingImage = false;
    this.changeDetector.detectChanges();
  }

  deleteTool() {
    this.swi.swiTools = this.swi.swiTools.filter(t => t.id != this.tool.id);
    this.save(true);
  }

  save(navBack: Boolean) {
    if (generateHash(JSON.stringify(this.swi)) == this.initialState) {
      console.log("No changes");
      if (navBack) this.router.navigate(['builder', this.swi.id]);
    } else {
      //Save the file and navigate back to the SWI Builder screen
      this.swiService.saveFile(this.swi)
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
