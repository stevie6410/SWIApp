import { Component, OnInit, ViewChild, Input, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SWIHeader, SWIStage } from '../../../../models/app.models';
import { ActivatedRoute, Params } from '@angular/router';
import { SWIFileService } from '../../../../services/swi-file.service';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-swi-stage-edit',
  templateUrl: './swi-stage-edit.component.html',
  styleUrls: ['./swi-stage-edit.component.css']
})
export class SwiStageEditComponent implements OnInit {

  title: string = "Edit Stage";
  swi: SWIHeader;
  stage: SWIStage;
  filename: string;
  sequence: number;

  constructor(
    private route: ActivatedRoute,
    private swiService: SWIFileService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef
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
            this.swi = swi;
            this.stage = this.swi.swiStages.filter(s => s.sequence == this.sequence)[0];
            console.log(this.stage);
            this.title = `SWI Builder - ${this.swi.title} - Edit Stage - ${this.sequence}`;
          })
      }
    });
  }

  startCamera() {
    console.log('Start the camera');
  }

  saveFile(swi: SWIHeader) {
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

}
