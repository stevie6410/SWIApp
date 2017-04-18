import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

import { SWIFileService } from '../../../../services/swi-file.service';
import { SWIHeader } from '../../../../models/app.models';

@Component({
  selector: 'swi-builder-screen',
  templateUrl: './swi-builder-screen.component.html',
  styleUrls: ['./swi-builder-screen.component.css']
})
export class SwiBuilderScreenComponent implements OnInit {

  isLoading: boolean = false;
  swi: SWIHeader;
  filename: string;
  pageTitle: string = "SWI Builder";
  initalSWIState: number;

  constructor(
    private swiService: SWIFileService,
    private vcr: ViewContainerRef,
    private toast: ToastsManager,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.toast.setRootViewContainerRef(vcr);
    this.route.params.subscribe((params: Params) => {
      this.filename = this.checkExtention(params['filename']);
      this.getFile(this.filename);
    })
  }

  ngOnInit() {
  }

  onBackButton() {
    this.saveFile(true);
  }

  checkExtention(filename: string) {
    if (!filename.endsWith('.swi')) {
      return filename + '.swi'
    } else {
      return filename;
    }
  }

  getFile(filename: string) {
    console.log(`getFile: ${filename}`);
    this.isLoading = true;
    this.swi = this.route.snapshot.data['swi'];
    this.initalSWIState = this.generateHash(JSON.stringify(this.swi));

    console.log(`got file: `, this.swi);
    if (this.swi) {
      this.validateStageOrder();
      this.toast.success(`Loaded document ${this.swi.title}`, `SWI Loaded`);
    } else {
      this.toast.error(`Document is not a valid swi`, `Invalid File`);
    }
    this.isLoading = false;
  }

  validateStageOrder() {
    let i = 1;
    this.swi.swiStages.forEach(stage => {
      if (stage.sequence != i) stage.sequence = i;
      i++;
    });
  }

  saveFile(navBack: boolean) {
    if (this.generateHash(JSON.stringify(this.swi)) == this.initalSWIState) {
      console.log("No changes");
      if (navBack) this.router.navigate(['swibrowser']);
    } else {
      console.log("Saving as there were changes");
      this.swiService.saveFile(this.filename, this.swi)
        .then((result) => {
          if (navBack) {
            this.router.navigate(['swibrowser']);
          } else {
            this.toast.success(`${this.swi.title} was saved`, `File Saved!`);
          }
        })
        .catch((err) => {
          console.log("Error saving file: ", err);
          this.toast.error(`${this.filename} could not be created`, "Error saving file!");
        })
    }
  }

  openLocalDocsDir() {
    this.swiService.openLocalDocumentsDirectory();
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
