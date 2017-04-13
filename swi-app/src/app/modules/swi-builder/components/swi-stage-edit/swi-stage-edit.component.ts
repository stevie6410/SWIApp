import { Component, OnInit, OnDestroy, ViewChild, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SWIHeader, SWIStage, SWIImage } from '../../../../models/app.models';
import { ActivatedRoute, Params } from '@angular/router';
import { SWIFileService } from '../../../../services/swi-file.service';
import { ToastsManager } from 'ng2-toastr';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";


@Component({
  selector: 'app-swi-stage-edit',
  templateUrl: './swi-stage-edit.component.html',
  styleUrls: ['./swi-stage-edit.component.css']
})
export class SwiStageEditComponent implements OnInit, OnDestroy {

  title: string = "Edit Stage";
  swi: SWIHeader;
  stage: SWIStage;
  filename: string;
  sequence: number;
  isFetchingImage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private swiService: SWIFileService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
    private changeDetector: ChangeDetectorRef
  ) {
    toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['filename'] && params['sequence']) {
        this.filename = params['filename'];
        this.sequence = +params['sequence'];
        this.swiService.getFile(this.filename)
          .then((swi: SWIHeader) => {
            console.log("Got SWI from service");
            this.swi = swi;
            this.stage = this.swi.swiStages.filter(s => s.sequence == this.sequence)[0];
            console.log(this.stage);
            this.title = `SWI Builder - ${this.swi.title} - Edit Stage - ${this.sequence}`;
          })
      }
    });
  }

  ngOnDestroy() {
    this.saveFile();
  }

  addImage() {
    this.isFetchingImage = true;
  }

  saveFile() {
    this.swiService.saveFile(this.filename, this.swi)
      .then((result) => {
        console.log(`${this.filename} was saved.`);
        this.toast.success(`${result} was saved`, `File Saved!`);
      }
      )
      .catch((err) => {
        console.log("Error saving file: ", err);
        this.toast.error(`${this.filename} could not be created`, "Error saving file!");
      })
  }

  imageSelected(image: string) {
    console.log('Image Selected from edit component');
    let newSwiImage: SWIImage = new SWIImage(image);
    this.swi.swiImages.push(newSwiImage);
    this.stage.image = newSwiImage.key;
    this.isFetchingImage = false;
    this.changeDetector.detectChanges();
  }

  getImageFromKey(key: string): string {
    try {
      if (!key) return ImagePlaceholder;
      return this.swi.swiImages.filter(i => i.key == key)[0].value;
    } catch (error) {
      return ImagePlaceholder;
    }
  }
}
