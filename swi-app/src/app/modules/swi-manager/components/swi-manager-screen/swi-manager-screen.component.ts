import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SWIHeader } from "../../../../models/app.models";
import { SWIFileService } from "../../../../services/swi-file.service";
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
  title: string;

  constructor(
    public overlay: Overlay,
    public vcr: ViewContainerRef,
    public modal: Modal,
    private route: ActivatedRoute,
    private router: Router,
    public swiFileService: SWIFileService,
    private toast: ToastsManager
  ) {
    this.swi = this.route.snapshot.data['swi'];
    overlay.defaultViewContainer = vcr;
    this.title = "SWI Manager - " + this.swi.title;
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
        this.swiFileService.deleteSWI(this.swi.id).then(((delSwi: SWIHeader) => {
          this.toast.warning(this.swi.title + ' was deleted!', "Successfully Deleted");
          this.navBack();
        })).catch((err) => {
          this.toast.error("Could not delete the SWI", "Delete failed");
        });
      })
      .catch(err => console.log('Canceled'));
  }

}
