import { Component, OnInit, ViewChild, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";
import { ToastsManager } from 'ng2-toastr';
import { SWIHeader, SWIStage, SWIImage, generateHash, hasChanges } from '../../../../models/app.models';
import { SWIFileService } from '../../../../services/swi-file.service';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { CameraService } from "../../../camera/services/camera.service";

@Component({
  selector: 'app-swi-stage-edit',
  templateUrl: './swi-stage-edit.component.html',
  styleUrls: ['./swi-stage-edit.component.css']
})
export class SwiStageEditComponent implements OnInit {

  title: string = "Edit Stage";
  swi: SWIHeader;
  stage: SWIStage;
  sequence: number;
  initalSWIState: number;

  constructor(
    private route: ActivatedRoute,
    public swiService: SWIFileService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    public overlay: Overlay,
    public modal: Modal,
    private cameraService: CameraService
  ) {
    toast.setRootViewContainerRef(vcr);
    overlay.defaultViewContainer = vcr;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.sequence = +params['sequence'];
      this.swi = this.route.snapshot.data['swi'];
      this.initalSWIState = generateHash(JSON.stringify(this.swi));
      this.stage = this.swi.swiStages.filter(s => s.sequence == this.sequence)[0];
      this.title = `SWI Builder - ${this.swi.title} - Edit Stage - ${this.sequence}`;
    });
  }

  addImage() {
    let currentImage: string = this.swiService.getImageFromStore(this.swi, this.stage.image);
    this.cameraService.requestCameraImage(currentImage).subscribe((captureImage) => {
      this.stage.image = this.swiService.addImage(this.swi, captureImage.image);
      this.changeDetector.detectChanges();
    });
  }

  save(navBack: Boolean) {
    if (hasChanges(this.swi, this.initalSWIState)) {
      console.log("No changes");
      if (navBack) this.navBack();
    } else {
      //Save the file and navigate back to the SWI Builder screen
      this.swiService.saveFile(this.swi)
        .then((result) => {
          this.toast.success(`${this.swi.title} was saved`, `File Saved!`);
          console.log(`${this.swi.id} was saved.`);
          if (navBack) this.navBack();
        })
        .catch((err) => {
          console.log("Error saving file: ", err);
          this.toast.error(`${this.swi.title} could not be created`, "Error saving file!");
        })
    }
  }

  cancelChanges() {
    if (hasChanges(this.swi, this.initalSWIState)) {
      this.modal.confirm()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .titleHtml('<h5>Cancel Changes</h5>')
        .body(`
          Are you sure you want to return to the SWI without saving?
          `)
        .okBtn('Return to SWI')
        .okBtnClass('btn btn-primary')
        .cancelBtn('Cancel')
        .cancelBtnClass('btn btn-secondary')
        .open()
        .then(dialogRef => dialogRef.result)
        .then(result => {
          this.navBack();
        })
        .catch(err => console.log('Canceled'));
    } else {
      this.navBack();
    }
  }

  navBack() {
    this.router.navigate(['builder', this.swi.id]);
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
