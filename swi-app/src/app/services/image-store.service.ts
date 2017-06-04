import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Ng2PicaService } from 'ng2-pica';
import { SWIHeader, SWIImage, SWIStoreImage } from "../models/app.models";
import { ImagePlaceholder } from "assets/image-placeholder";
import { SWIDBService } from "../modules/core/swi-db.service";
import { ImageService } from "./image.service";
import { CameraService } from "../modules/camera/services/camera.service";
import { CaptureImage } from "app/modules/camera/models/capture-image";

@Injectable()
export class ImageStoreService {

    imageStore: Dexie.Table<SWIStoreImage, string>;

    constructor(
        private db: SWIDBService,
        private pica: Ng2PicaService,
        private imageService: ImageService,
        private cameraService: CameraService
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
    public add(swiId: string, image: string | SWIImage): Promise<SWIImage> {
        console.log("Adding image");
        return new Promise<SWIImage>((resolve, reject) => {
            //Check the image input type and get an SWIImage to work with
            let swiImg: SWIImage;
            if (typeof image === "string") {
                swiImg = new SWIImage(image);
            } else {
                swiImg = image;
            }

            //Setup promises for generating tumbnails and compressed
            this.compressImages(swiImg).then(result => {
                // console.log("SWI Images have been compressed ", result);
                let swiStoreImg: SWIStoreImage = this.convertToStoreImage(swiId, swiImg);
                this.imageStore.add(swiStoreImg)
                    .then(result => resolve(swiImg))
                    .catch(err => reject(err));
            });
        });
    }

    /**
     * Loads all of the images in an SWI document into the Image Store
     * @param swi 
     */
    public addSWI(swi: SWIHeader): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let promises: Promise<SWIImage>[] = [];
            if (swi.swiImages) {
                swi.swiImages.forEach(img => {
                    promises.push(this.add(swi.id, img));
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
                console.log(key);
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

    //Cleanup an SWI document's images (Removes unused images from the store)
    //Cleanup images which do not have a link to an swi
    public clean(swi: SWIHeader): SWIHeader {

        let imgCount: number = swi.swiImages.length;

        //Get a list of all image keys used in the swi 
        let keys: string[] = [];
        if (swi.coverImage) keys.push(swi.coverImage);
        swi.swiStages.forEach(stage => {
            if (stage.image) keys.push(stage.image);
        });
        swi.swiTools.forEach(tool => {
            if (tool.image) keys.push(tool.image);
        });
        swi.swiImages.forEach(image => {
            if (!(keys.indexOf(image.key) > -1)) {
                swi.swiImages = swi.swiImages.filter(img => img.key != image.key);
            }
        });

        if (swi.swiImages.length < imgCount) {
            console.log(`Cleanup removed ${imgCount - swi.swiImages.length} images`)
        }

        return swi;
    }

    //Will take an SWIHeader and check for any swis in the document and
    //split them out into the store, while checking for dulpicates. Will
    //also make sure that all of the swi image keys have a matching store record 
    public sync(swi: SWIHeader): Promise<SWIHeader> {
        return new Promise<SWIHeader>((resolve, reject) => {
            this.addSWI(swi).then(() => {
                swi.swiImages = [];
                resolve(swi);
            });
        });
    }

    //  ######################      Private Helper Functions       ######################################

    private isLoaded(imageKey: string): Promise<boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            this.imageStore.orderBy("key").uniqueKeys().then(keys => {
                console.log(keys);
            });
        });
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