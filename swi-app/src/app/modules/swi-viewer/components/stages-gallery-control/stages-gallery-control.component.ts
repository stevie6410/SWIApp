import { Component, Input, OnChanges, EventEmitter, Output, Inject, forwardRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

export interface ImageInterface {
    thumbnail?: any;
    image?: any;
    text?: string;
    [propName: string]: any;
}

@Component({
    selector: 'stages-gallery',
    template: `
    <div class="ng2-image-gallery-thumbnails" *ngIf="!draggable">
        <div *ngFor="let image of images; let index=index" class="ng2-image-gallery-thumbnail-container">
            <img [src]="image[asThumbnail]" (click)="openLightboxGallery(index)" class="ng2-image-gallery-thumbnail">
            <button class="btn btn-primary ng2-image-gallery-action" *ngIf="actionText!==''" (click)="onAction(image)" [innerHTML]="actionText"></button>
        </div>
    </div>
    <div class="ng2-image-gallery-thumbnails" [dragula]="'ng2-image-gallery-bag'" [dragulaModel]='images' *ngIf="draggable">
        <div *ngFor="let image of images; let index=index" class="ng2-image-gallery-thumbnail-container">
            <img [src]="image[asThumbnail]" (click)="openLightboxGallery(index)" class="ng2-image-gallery-thumbnail">
            <button class="btn btn-primary ng2-image-gallery-action" *ngIf="actionText!==''" (click)="onAction(image)" [innerHTML]="actionText"></button>
        </div>
    </div>
    <to-body-displacer>
        <div class="ng2-image-gallery-overlay" [hidden]="!isLightboxOpen">
            <div class="ng2-image-gallery-lightbox">
                <a class="ng2-igl-close" (click)="closeLightboxGallery()"><i class="fa fa-close"></i></a>
                <a class="ng2-igl-nav-left" *ngIf="images.length >1 && curImageIndex!==0" (click)="previousImage()"><i class="fa fa-angle-left"></i></a>
                <img [hidden]="loading" *ngIf="images.length>0" [src]="images[curImageIndex][asImage]" (click)="nextImage()" class="ng2-igl-img" (load)="onLoad()" />
                <span [hidden]="!loading" *ngIf="images.length>0" class="ng2-igl-loading"><i class="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i></span>
                <a class="ng2-igl-nav-right" *ngIf="images.length >1 && curImageIndex!==images.length-1" (click)="nextImage()"><i class="fa fa-angle-right"></i></a>
                <span class="ng2-igl-text" *ngIf="images.length>0" [innerHTML]="images[curImageIndex][asText]"></span>
                <span class="ng2-igl-count">{{curImageIndex+1}}/{{images.length}}</span>
                <div class="ng2-igl-thumbnails">
                    <a class="ng2-igl-nav-left thumbnails" [ngClass]="{'non-visible': curThumbnailIndex < 4 }" (click)="thumbnailsPrevious()"><i class="fa fa-angle-left"></i></a>
                    <ng-template ngFor let-image [ngForOf]="images" let-index="index">
                        <img [src]="image[asThumbnail]" (click)="toImage(index)" 
                            *ngIf="(curThumbnailIndex>images.length-4 && index > images.length-8)||(curThumbnailIndex<4 && index < 7)||(index >= curThumbnailIndex -3) && (index <= curThumbnailIndex+3)"
                            [ngClass]="{'active':curImageIndex===index}"
                            class="ng2-igl-thumbnail rounded-circle">
                    </ng-template>
                    <a class="ng2-igl-nav-right thumbnails" [ngClass]="{'non-visible': curThumbnailIndex > images.length-5 }" (click)="thumbnailsNext()"><i class="fa fa-angle-right"></i></a>
                </div>
            </div>
        </div>
    </to-body-displacer>`
})
export class StagesGalleryControlComponent implements OnChanges {
    @Input() images: ImageInterface[] = [];
    @Input('draggable') draggable: boolean = false;
    @Input('asImage') asImage: string = "image";
    @Input('asThumbnail') asThumbnail: string = "thumbnail";
    @Input('asText') asText: string = "text";
    @Input('actionText') actionText: string = "";
    @Output('onAction') actionEmitter: EventEmitter<any> = new EventEmitter();
    @Output('onDrop') dropEmitter: EventEmitter<any> = new EventEmitter();
    @Output('onClose') closeEmitter: EventEmitter<any> = new EventEmitter();
    loading: boolean = false;
    curImageIndex: number = 0;
    curThumbnailIndex: number = 0;
    isLightboxOpen: boolean = true;
    constructor( @Inject(forwardRef(() => DragulaService)) private dragulaService: DragulaService) {
        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
        });
    }
    ngOnChanges(changes) {
        if (changes.images) {
            this.images = changes.images.currentValue;
        }
    }
    public openLightboxGallery(index: number): void {
        this.isLightboxOpen = true;
        setTimeout(() => {
            this.curImageIndex = index - 1;
            this.nextImage();
            this.loading = false;
        }, 0);
    }
    public closeLightboxGallery(): void {
        // this.isLightboxOpen = false;
        this.closeEmitter.emit();

    }
    public nextImage(): void {
        if (this.curImageIndex !== this.images.length - 1) {
            this.loading = true;
            this.curImageIndex++;
            this.curThumbnailIndex = this.curImageIndex;
        }
    }
    public previousImage(): void {
        this.loading = true;
        if (this.curImageIndex !== 0) {
            this.curImageIndex--;
        }
        this.curThumbnailIndex = this.curImageIndex;
    }
    public toImage(index: number): void {
        this.loading = true;
        this.curImageIndex = index;
        this.curThumbnailIndex = this.curImageIndex;
    }
    public thumbnailsNext(): void {
        if (this.curThumbnailIndex + 5 < this.images.length) {
            this.curThumbnailIndex += 5;
        }
        else {
            this.curThumbnailIndex = this.images.length - 1;
        }
        this.curThumbnailIndex += 5;
    }
    public thumbnailsPrevious(): void {
        if (this.curThumbnailIndex - 5 > 0) {
            this.curThumbnailIndex -= 5;
        }
        else {
            this.curThumbnailIndex = 0;
        }
    }
    public onLoad(): void {
        this.loading = false;
    }
    public onAction(image: any): void {
        this.actionEmitter.emit({
            image: image
        });
    }
    public onDrop(args) {
        let [e, el] = args;
        this.dropEmitter.emit({
            images: this.images
        });
    }
}