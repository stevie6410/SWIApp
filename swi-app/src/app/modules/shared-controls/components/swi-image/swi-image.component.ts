import { Component, OnInit, AfterViewInit, OnChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ImageStoreService } from "../../../../services/image-store.service";
import { ImagePlaceholder, ImageLoading } from "../../../../../assets/image-placeholder";

@Component({
  selector: 'swi-img',
  template: `
    <img [src]="img">
  `,
  styleUrls: ['./swi-image.component.scss']
})
export class SwiImageComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() imageKey: string;
  @Input() size: number;
  @Input() thumbnail: boolean = false;
  public img: string;
  public isLoading: boolean = true;

  constructor(
    public imageStore: ImageStoreService,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.checkLoadImage();
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkLoadImage();
  }

  checkLoadImage() {
    this.img = ImageLoading;
    if (!this.imageKey) {
      this.img = ImagePlaceholder;
      this.isLoading = false;
      return;
    }
    this.imageStore.get(this.imageKey, this.thumbnail)
      .then(result => {
        this.img = result;
        this.isLoading = false;
        this.change.detectChanges();
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        this.change.detectChanges();
      });
  }
}