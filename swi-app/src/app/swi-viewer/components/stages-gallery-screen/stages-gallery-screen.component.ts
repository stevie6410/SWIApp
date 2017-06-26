import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ImageInterface } from "../stages-gallery-control/stages-gallery-control.component";
import { ImagePlaceholder } from "assets/image-placeholder";
import { SWIHeader, SWIFileService, ImageStoreService } from "app/core";

@Component({
  selector: 'swi-stages-gallery-screen',
  template: `
  <stages-gallery [images]="images" (onClose)="navBack()"></stages-gallery>
`,
  styleUrls: ['./stages-gallery-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StagesGalleryScreenComponent implements OnInit {

  swi: SWIHeader;
  images: ImageInterface[] = [];
  title: string = "Stages Gallery";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private swiFileService: SWIFileService,
    public imageStore: ImageStoreService
  ) { }

  ngOnInit() {
    this.swi = this.route.snapshot.data['swi'];
    this.setImagesArray();
  }

  async setImagesArray() {
    //Use the embed images to get the image array, then strip it out into its own property
    this.swi = await this.imageStore.emmbedImagesIntoSWI(this.swi);
    let images = this.swi.swiImages.slice();
    console.log("images", images);
    this.swi.swiImages = [];

    for (var i = 0; i < this.swi.swiStages.length; i++) {
      var stage = this.swi.swiStages[i];
      let newImg: ImageInterface = {};
      let result = images.filter(i => i.key == stage.image)[0];
      newImg.image = (result != null) ? result.value : ImagePlaceholder;
      newImg.thumbnail = (result) ? result.value : ImagePlaceholder;
      newImg.text = stage.summary;
      this.images.push(newImg);
    }
  }

  navBack() {
    this.router.navigate(['viewer', this.swi.id]);
  }
}