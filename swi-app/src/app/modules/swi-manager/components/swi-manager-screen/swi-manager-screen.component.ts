import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SWIHeader } from "../../../../models/app.models";
import { SWIFileService } from "../../../../services/swi-file.service";
import { ToastsManager } from "ng2-toastr";

@Component({
  selector: 'swi-swi-manager-screen',
  templateUrl: './swi-manager-screen.component.html',
  styleUrls: ['./swi-manager-screen.component.scss']
})
export class SwiManagerScreenComponent implements OnInit {

  swi: SWIHeader;
  title: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private swiFileService: SWIFileService,
    private toast: ToastsManager
  ) {
    this.swi = this.route.snapshot.data['swi'];
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
    this.swiFileService.deleteSWI(this.swi.id).then(((delSwi: SWIHeader) => {
      this.toast.warning(this.swi.title + ' was deleted!', "Successfully Deleted");
      this.navBack();
    })).catch((err) => {
      this.toast.error("Could not delete the SWI", "Delete failed");
    });
  }

}
