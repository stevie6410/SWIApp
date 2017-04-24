import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { SWIHeader, SWIImage } from '../../../../models/app.models';
import { ImagePlaceholder } from "../../../../../assets/image-placeholder";
@Component({
  selector: 'swi-header',
  templateUrl: './swi-header.component.html',
  styleUrls: ['./swi-header.component.css']
})
export class SwiHeaderComponent implements OnInit {

  @Input() swi: SWIHeader;
  @Output() onSave: EventEmitter<SWIHeader> = new EventEmitter<SWIHeader>();

  title: string = "SWI Header";
  isFetchingImage: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  save() {
    this.onSave.emit(this.swi);
  }

  getImageFromKey(key: string): string {
    try {
      if (!key) return ImagePlaceholder;
      let result = this.swi.swiImages.filter(i => i.key == key)[0];
      if (result) return result.value;
    } catch (error) {
      return ImagePlaceholder;
    }
  }

  toggleFetchingImage() {
    this.isFetchingImage = !this.isFetchingImage;
  }

  coverImageSelected(image: string) {
    let newSwiImage: SWIImage = new SWIImage(image);
    if (!this.swi.swiImages) this.swi.swiImages = new Array<SWIImage>();
    this.swi.swiImages.push(newSwiImage);
    this.swi.coverImage = newSwiImage.key;
    this.isFetchingImage = false;
    this.changeDetector.detectChanges();
  }
}
