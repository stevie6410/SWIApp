import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SWIHeader } from "../../../../models/app.models";
import { Router, ActivatedRoute } from "@angular/router";
import { SWIFileService } from "../../../../services/swi-file.service";
import { ImageInterface } from "../stages-gallery-control/stages-gallery-control.component";

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
    private swiFileService: SWIFileService
  ) { }

  ngOnInit() {
    this.swi = this.route.snapshot.data['swi'];
    this.setImagesArray();
  }

  setImagesArray(){
    this.swi.swiStages.forEach(stage => {
        let newImg: ImageInterface = {};
        newImg.image = this.swiFileService.getImageFromStore(this.swi, stage.image);
        newImg.text = stage.summary;
        newImg.thumbnail = newImg.image;
        this.images.push(newImg);
    });
  } 

  navBack(){
    this.router.navigate(['viewer', this.swi.id]);
  }

}


