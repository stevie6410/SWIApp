import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SWIHeader } from "../../../../../app/models/app.models";
import { BrandImage } from "../../../../../assets/image-placeholder";
import { SWIFileService } from "../../../../services/swi-file.service";
import { ImageStoreService } from '../../../../services/image-store.service';

@Component({
  selector: 'swi-swi-viewer-screen',
  templateUrl: './swi-viewer-screen.component.html',
  styleUrls: ['./swi-viewer-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SwiViewerScreenComponent implements OnInit {

  swi: SWIHeader;
  title: string;
  brandImage: string = BrandImage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public swiFileService: SWIFileService,
    public imageStore: ImageStoreService
  ) {
    this.swi = this.route.snapshot.data['swi'];
    this.title = this.swi.title;
    console.log(this.swi);
  }

  ngOnInit() {
  }

  onBackButton() {
    this.router.navigate(['manager', this.swi.id]);
  }

  openPrintPreview(){
    window.print();
  }

  openStagesGallery(){
    this.router.navigate(['viewer', this.swi.id, 'stagesgallery']);
  }
}
