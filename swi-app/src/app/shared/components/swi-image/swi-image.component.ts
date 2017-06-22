import { Component, OnInit, AfterViewInit, OnChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges, OnDestroy } from '@angular/core';
import { ImageLoading, ImagePlaceholder } from "assets/image-placeholder";
import { ImageStoreService } from "app/core";

@Component({
  selector: 'swi-img',
  template: `
    <div class="img-container">
      <img [src]="img" [ngClass]="{'img-border': border}">
    </div>
  `,
  styleUrls: ['./swi-image.component.scss']
})
export class SwiImageComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() imageKey: string;
  @Input() src: string;
  @Input() size: number;
  @Input() thumbnail: boolean = false;
  @Input() border: boolean = false;
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

    if (this.src) {
      //Load the src directly
      this.img = this.src;
      this.isLoading = false;
    }
    else if (this.imageKey) {
      this.imageStore.get(this.imageKey, this.thumbnail)
        .then(result => {
          this.img = result;
          this.isLoading = false;
          // this.change.detectChanges();
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
          // this.change.detectChanges();
        });
    } else {
      this.img = ImagePlaceholder;
      this.isLoading = false;
      return;
    }
  }

  ngOnDestroy() {
    this.change.detach();
  }
}