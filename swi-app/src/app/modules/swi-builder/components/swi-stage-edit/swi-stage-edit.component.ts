import { Component, OnInit, ViewChild, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";
import { ToastsManager } from 'ng2-toastr';
import { SWIHeader, SWIStage, SWIImage } from '../../../../models/app.models';
import { SWIFileService } from '../../../../services/swi-file.service';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";

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
  isFetchingImage: boolean = false;
  initalSWIState: number;

  constructor(
    private route: ActivatedRoute,
    public swiService: SWIFileService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    public overlay: Overlay,
    public modal: Modal
  ) {
    toast.setRootViewContainerRef(vcr);
    overlay.defaultViewContainer = vcr;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.sequence = +params['sequence'];
      this.swi = this.route.snapshot.data['swi'];
      this.initalSWIState = this.generateHash(JSON.stringify(this.swi));
      this.stage = this.swi.swiStages.filter(s => s.sequence == this.sequence)[0];
      this.title = `SWI Builder - ${this.swi.title} - Edit Stage - ${this.sequence}`;
    });
  }

  addImage() {
    this.isFetchingImage = true;
  }

  backButtonClick() {
    this.save(true);
  }

  deleteStage() {
    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(false)
      .keyboard(27)
      .titleHtml('<h5>Confirm Delete Stage</h5>')
      .body(`Are you sure you want to delete stage ${this.stage.sequence}?`)
      .okBtn('Delete Stage')
      .okBtnClass('btn btn-danger')
      .cancelBtn('Cancel')
      .cancelBtnClass('btn btn-secondary')
      .open()
      .then(dialogRef => dialogRef.result)
      .then(result => {
        this.swi.swiStages = this.swi.swiStages.filter(s => s.sequence != this.stage.sequence);
        this.save(true);
      })
      .catch(err => console.log('Canceled'));
  }

  save(navBack: Boolean) {
    if (this.generateHash(JSON.stringify(this.swi)) == this.initalSWIState) {
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
