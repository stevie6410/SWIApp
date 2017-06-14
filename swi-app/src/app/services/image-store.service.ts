import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Ng2PicaService } from 'ng2-pica';
import { SWIHeader, SWIImage, SWIStoreImage, GUID } from "../models/app.models";
import { ImagePlaceholder } from "assets/image-placeholder";
import { SWIDBService } from "../modules/core/swi-db.service";
import { ImageService } from "./image.service";
import { CameraService } from "../modules/camera/services/camera.service";
import { CaptureImage } from "app/modules/camera/models/capture-image";
import { Observable } from "rxjs/Rx";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ImageStoreService {

    imageStore: Dexie.Table<SWIStoreImage, string>;
    swiStore: Dexie.Table<SWIHeader, string>;

    constructor(
        private db: SWIDBService,
        private pica: Ng2PicaService,
        private imageService: ImageService,
        private cameraService: CameraService
    ) {
        this.imageStore = this.db.table('imageStore');
        this.swiStore = this.db.table('swis');
        console.log("Init image store");
    }

    //  ######################      Public Functions       ######################################

    /**
     * Gets a photo from the camera control. Returns the key
     * @param currentImageKey 
     * @param swiId 
     */
    public callCamera(currentImageKey: string, swiId: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.get(currentImageKey).then(img => {
                this.cameraService.requestCameraImage(img).subscribe((captureImage: CaptureImage) => {
                    //Got the image from the camera, now add the image to the store
                    this.add(swiId, captureImage.image).then(swiImg => {
                        //Added to the image store. Now return the key
                        resolve(swiImg.key);
                    });
                });
            });
        });
    }

    /**
     * Loads image into the ImageStore 
     * @param swiId SWI Id
     * @param image Image as a Base64 string or SWIImage object
     */
    public async add(swiId: string, image: string | SWIImage, compress: boolean = false): Promise<SWIImage> {
        let swiImg = (typeof image === "string") ? new SWIImage(image) : image;

        if (compress) swiImg = await this.compressImages(swiImg);
        swiImg = await this.generateThumbnail(swiImg);
        let swiStoreImg = this.convertToStoreImage(swiId, swiImg);
        try {
            await this.imageStore.add(swiStoreImg)
            return swiImg;
        } catch (error) {
            if (error.message == "Key already exists in the object store.") {
                return swiImg;
            }
            console.log("Could not add image to image store", error);
        }
    }

    /**
     * Loads all of the images in an SWI document into the Image Store
     * @param swi 
     */
    public async addAll(swi: SWIHeader, swiKey: string, compress: boolean = false): Promise<void> {
        if (swi.swiImages) {
            for (var i = 0; i < swi.swiImages.length; i++) {
                var element = swi.swiImages[i];
                await this.add(swiKey, element, compress);
                console.log(`Image ${i} of ${swi.swiImages.length}`);
            }
        }
    }

    //Retreive an image from the SWI Image Store 
    public get(key: string, thumbnail: boolean = false): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (!key) resolve(ImagePlaceholder);
            try {
                // console.log(key);
                this.imageStore.get(key)
                    .then(storeImg => {
                        if (!storeImg) {
                            console.log("Image not in store");
                            resolve(ImagePlaceholder);
                            return;
                        }
                        resolve(this.imageService.checkImagePrefix((thumbnail) ? storeImg.thumbnail : storeImg.value));
                    })
                    .catch(err => {
                        console.log("Error getting image from db image store", err);
                        resolve(ImagePlaceholder);
                    });
            } catch (error) {
                resolve(ImagePlaceholder);
            }
        });
    }

    public async emmbedImagesIntoSWI(swi: SWIHeader): Promise<SWIHeader> {
        //Get any images linked to this SWI from the image-store
        let storeImages = await this.imageStore.filter(i => i.swiKey == swi.id).toArray();
        console.log("store images", storeImages);
        if (storeImages) {
            let images: SWIImage[];
            images = storeImages.map(image => {
                let img = new SWIImage(image.value);
                img.key = image.key;
                img.thumbnail = null;
                return img;
            });
            // images = storeImages;
            swi.swiImages = images;
            console.log("Attached these images", images);
        } else {
            console.log("No store images found");
        }
        return swi;
    }

    //Cleanup an SWI document's images (Removes unused images from the store)
    //Cleanup images which do not have a link to an swi
    public async clean(): Promise<void> {
        let s = new Subject<number>();

        //Get all image keys used in the SWIs
        let usedImages: string[] = [];
        let swis: SWIHeader[] = await this.swiStore.toArray();
        swis.forEach((swi) => usedImages = usedImages.concat(this.getSWIImageKeys(swi)));

        console.log("Used Images Count", usedImages.length);
        console.log("Image Store Count", await this.imageStore.count());

        //For each image in the store check to see if it is used
        let unusedImages: string[] = [];
        await this.imageStore.toCollection().eachUniqueKey((imageKey) => {
            if (usedImages.indexOf(imageKey.toString()) == -1) unusedImages.push(imageKey.toString());
        });
        await this.imageStore.bulkDelete(unusedImages);
        console.log(`Deleted ${unusedImages.length} Images`);
        return;
    }

    public async duplicateImage(imageKey: string, newSWIKey: string): Promise<string> {
        if (!imageKey) return null;
        let origImg = await this.imageStore.get(imageKey);
        console.log("Orig Img", origImg);
        let newImg = Object.assign({}, origImg);
        newImg.key = new GUID().value;
        newImg.swiKey = newSWIKey;
        console.log("New Img", newImg);
        let result = await this.imageStore.add(newImg);
        console.log("New Img", newImg);
        return result;
    }

    //  ######################      Private Helper Functions       ######################################

    private progress(total: number, increment: number): number {
        return Math.trunc((increment / total) * 100);
    }

    private async isLoaded(imageKey: string): Promise<boolean> {
        let result = await this.imageStore.get(imageKey);
        return (result != null);
    }

    private hasChanged(imageKey: string, image: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

        });
    }

    public getSWIImageKeys(swi: SWIHeader): string[] {
        let results: string[] = [];
        if (swi.coverImage) results.push(swi.coverImage);
        results = results.concat(swi.swiStages.map(s => s.image));
        results = results.concat(swi.swiTools.map(t => t.image));
        // console.log("Got these SWI Keys for " + swi.id, results);
        return results.filter(img => img != undefined);
    }

    //Convert a regeular SWI Image to an SWIStoreImage
    private convertToStoreImage(swiId: string, swiImage: SWIImage): SWIStoreImage {
        let storeImg: SWIStoreImage = new SWIStoreImage(swiImage.value);
        storeImg.key = swiImage.key;
        storeImg.swiKey = swiId;
        storeImg.thumbnail = swiImage.thumbnail;
        return storeImg;
    }

    private async compressImages(swiImg: SWIImage): Promise<SWIImage> {
        //Generate the main image (compressed)
        var image = await this.imageService.generateImage(swiImg.value);
        if (image) swiImg.value = image;
        return swiImg;
    }

    private async generateThumbnail(swiImg: SWIImage): Promise<SWIImage> {
        //Genertate the thumbnail (comppressed)
        var thumb = await this.imageService.generateThumbnail(swiImg.value);
        if (thumb) swiImg.thumbnail = thumb;
        return swiImg;
    }


}