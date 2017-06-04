import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SWIHeader, GUID } from "../../../../models/app.models";
import { SWIFileService } from "../../../../services/swi-file.service";
import { ImageStoreService } from '../../../../services/image-store.service';
import { ToastsManager } from "ng2-toastr";
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";

@Component({
  selector: 'swi-swi-manager-screen',
  templateUrl: './swi-manager-screen.component.html',
  styleUrls: ['./swi-manager-screen.component.scss']
})
export class SwiManagerScreenComponent implements OnInit {

  swi: SWIHeader;
  newDupTitle: string;

  constructor(
    public overlay: Overlay,
    public vcr: ViewContainerRef,
    public modal: Modal,
    private route: ActivatedRoute,
    private router: Router,
    public swiFileService: SWIFileService,
    public imageStore: ImageStoreService,
    private toast: ToastsManager
  ) {
    this.swi = this.route.snapshot.data['swi'];
    overlay.defaultViewContainer = vcr;
    this.route.params.subscribe((params) => {
      //Detected a change to the params so reload the swiData
      if (params.id != this.swi.id) {
        this.swi = this.route.snapshot.data['swi'];
      }
    });
  }

  ngOnInit() {
  }

  navBack() {
    this.router.navigate(['browser']);
  }

  editSWI() {
    this.router.navigate(['builder', this.swi.id]);
  }

  viewSWI() {
    this.router.navigate(['viewer', this.swi.id]);
  }

  private confirmDuplicate(): Promise<string> {
    this.newDupTitle = this.swi.title.toString();
    return new Promise<string>((resolve, reject) => {
      this.modal.confirm()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .titleHtml('<h5>Duplicate SWI - New Title</h5>')
        .body(`
          Are you sure you want to duplicate this SWI?
          `)
        .okBtn('Duplicate')
        .okBtnClass('btn btn-primary')
        .cancelBtn('Cancel')
        .cancelBtnClass('btn btn-secondary')
        .open()
        .then(dialogRef => dialogRef.result)
        .then(result => {
          resolve('Copy of ' + this.swi.title);
        })
        .catch(err => console.log('Canceled'));
    });
  }


  duplicateSWI() {
    this.confirmDuplicate().then(result => {
      //Get a copy of the current SWI and change the ID
      let newSWI: SWIHeader = JSON.parse(JSON.stringify(this.swi));
      newSWI.id = new GUID().value;
      newSWI.title = result;
      this.swiFileService.createSWI(newSWI).then(value => {
        console.log("SWI has been duplicated", newSWI.id);
        this.router.navigate(['manager', newSWI.id]);
        this.toast.success(newSWI.title, "SWI has been duplicated");
      });

    });

  }

  deleteSWI() {

    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(false)
      .keyboard(27)
      .titleHtml('<h5>Confirm Delete SWI</h5>')
      .body(`Are you sure you want to delete this SWI?`)
      .okBtn('Delete Stage')
      .okBtnClass('btn btn-danger')
      .cancelBtn('Cancel')
      .cancelBtnClass('btn btn-secondary')
      .open()
      .then(dialogRef => dialogRef.result)
      .then(result => {
        //Delete logic goes here
        this.swiFileService.deleteSWI(this.swi.id).then((() => {
          this.toast.warning(this.swi.title + ' was deleted!', "Successfully Deleted");
          this.navBack();
        })).catch((err) => {
          this.toast.error("Could not delete the SWI", "Delete failed");
        });
      })
      .catch(err => console.log('Canceled'));
  }

}
