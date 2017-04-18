import { Component, OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SWITool, SWIHeader, SWIImage } from "../../../../../app/models/app.models";
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
  filename: string;
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
    private swiService: SWIFileService,
    private changeDetector: ChangeDetectorRef
  ) {
    toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['filename'] && params['toolid']) {
        this.swi = this.route.snapshot.data['swi'];
        this.initialState = this.generateHash(JSON.stringify(this.swi));

        this.toolId = params['toolid'];
        this.filename = params['filename'];

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
      }
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
    if (this.generateHash(JSON.stringify(this.swi)) == this.initialState) {
      console.log("No changes");
      if (navBack) this.router.navigate(['swibuilder', this.filename]);
    } else {
      //Save the file and navigate back to the SWI Builder screen
      this.swiService.saveFile(this.filename, this.swi)
        .then((result) => {
          console.log(`${this.filename} was saved.`);
          if (navBack) this.router.navigate(['swibuilder', this.filename]);
        })
        .catch((err) => {
          console.log("Error saving file: ", err);
          this.toast.error(`${this.filename} could not be created`, "Error saving file!");
        })
    }
  }

  getImageFromKey(key: string): string {
    try {
      if (!key) return ImagePlaceholder;
      return this.swi.swiImages.filter(i => i.key == key)[0].value;
    } catch (error) {
      return ImagePlaceholder;
    }
  }

  generateHash(obj: any) {
    var hash = 0, i, chr;
    if (obj.length === 0) return hash;
    for (i = 0; i < obj.length; i++) {
      chr = obj.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

}
