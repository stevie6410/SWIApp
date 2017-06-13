import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Ng2PicaService } from 'ng2-pica';
import { SWIHeader, SWIImage, SWIStoreImage } from "../models/app.models";
import { ImagePlaceholder } from "assets/image-placeholder";
import { SWIDBService } from "../modules/core/swi-db.service";
import { ImageService } from "./image.service";
import { CameraService } from "../modules/camera/services/camera.service";
import { CaptureImage } from "app/modules/camera/models/capture-image";
import { Observable } from "rxjs/Rx";
import { Subject } from "rxjs/Subject";
// import { SWIFileService } from "./swi-file.service";

@Injectable()
export class ImageStoreService {

    imageStore: Dexie.Table<SWIStoreImage, string>;

    constructor(
        private db: SWIDBService,
        private pica: Ng2PicaService,
        private imageService: ImageService,
        private cameraService: CameraService,
        // public fileService: SWIFileService
    ) {
        this.imageStore = this.db.table('imageStore');
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
    public async add(swiId: string, image: string | SWIImage): Promise<SWIImage> {
        let swiImg = (typeof image === "string") ? new SWIImage(image) : image;
        swiImg = await this.compressImages(swiImg);
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
    public addSWI(swi: SWIHeader, swiKey: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let promises: Promise<SWIImage>[] = [];
            if (swi.swiImages) {
                swi.swiImages.forEach(img => {
                    promises.push(this.add(swiKey, img));
                });
            }
            Promise.all(promises).then(results => {
                // console.log("swiImages added: ", results)
                resolve();
            });
        });
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
                        resolve(this.imageService.checkImagePrefix((thumbnail) ? storeImg.thumbnail : storeImg.image));
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
            //images = storeImages.map(image => new SWIImage(image.value));
            images = storeImages;
            swi.swiImages = images;
            console.log("Attached these images", images);
        } else {
            console.log("No store images found");
        }
        return swi;
    }

    //Cleanup an SWI document's images (Removes unused images from the store)
    //Cleanup images which do not have a link to an swi
    public clean(): Observable<number> {
        let s = new Subject<number>();

        this.imageStore.count().then(count => {
            let i = 0;
            this.imageStore.each((img) => {
                console.log(img.key);
                i++;
                // this.fileService.getFile(img.swiKey).then(swi => {
                //     let del: boolean = false;
                //     del = ((!swi) || (JSON.stringify(swi).indexOf(img.key) > -1));
                //     if (del) {
                //         this.imageStore.delete(img.key).then(() => {
                //             console.log("Deleted ", img.key);
                //             let progress: number = Math.trunc((i / count) * 100);
                //             s.next(progress);
                //         });
                //     } else {
                //         let progress: number = Math.trunc((i / count) * 100);
                //         s.next(progress);
                //     }
                // });
            });
        });
        return s.asObservable();
    }

    //Will take an SWIHeader and check for any swis in the document and
    //split them out into the store, while checking for dulpicates. Will
    //also make sure that all of the swi image keys have a matching store record 
    public async sync(swi: SWIHeader): Promise<SWIHeader> {
        await this.addSWI(swi, swi.id);
        swi.swiImages = [];
        return swi;
    }

    //  ######################      Private Helper Functions       ######################################

    private async isLoaded(imageKey: string): Promise<boolean> {
        let result = await this.imageStore.get(imageKey);
        return (result != null);
    }

    private hasChanged(imageKey: string, image: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

        });
    }

    //Convert a regeular SWI Image to an SWIStoreImage
    private convertToStoreImage(swiId: string, swiImage: SWIImage): SWIStoreImage {
        let storeImg: SWIStoreImage = new SWIStoreImage(swiImage.image);
        storeImg.key = swiImage.key;
        storeImg.swiKey = swiId;
        storeImg.thumbnail = swiImage.thumbnail;
        return storeImg;
    }

    private compressImages(swiImg: SWIImage): Promise<SWIImage> {
        return new Promise<SWIImage>((resolve, reject) => {
            this.imageService.generateImage(swiImg.value).then(imgResult => {
                if (imgResult) {
                    swiImg.image = imgResult;
                }
                this.imageService.generateThumbnail(swiImg.value).then(thumbResult => {
                    swiImg.thumbnail = thumbResult;
                    resolve(swiImg);
                })
                    .catch(() => console.log("Error generating thumbnail"));
            }).catch(() => console.log("Error generating image"));
        });
    }
}