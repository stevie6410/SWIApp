import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Ng2PicaService } from 'ng2-pica';
import { SWIHeader, SWIImage, SWIStoreImage } from "../models/app.models";
import { ImagePlaceholder } from "assets/image-placeholder";
import { SWIDBService } from "../services/swi-db.service";

@Injectable()
export class ImageService {

    imageStore: Dexie.Table<SWIStoreImage, string>;

    constructor(
        private pica: Ng2PicaService
    ) { }

    //Generic resize image function
    public resizeImage(image: string, size: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            // var imgStr = this.stripDataPrefix(image);
            var imgs: File[] = [];
            var bs: Blob[] = [];
            var b: Blob = this.dataURItoBlob(image);
            bs.push(b);
            imgs.push(new File(bs, "image.png"));

            this.pica.resize(imgs, size, size).subscribe((result) => {
                //all good, result is a file
                // console.info("Pica resize result: ", result);

                //Convert the file into base64
                this.blobToDataURI(result)
                    .then(base64Img => {
                        // console.log(base64Img);
                        if (base64Img != null) {
                            resolve(this.checkImagePrefix(base64Img));
                        } else {
                            console.log("Base64 result is null");
                            reject();
                        }
                    }).catch(() => console.error("Error converting blob to base64"));
            }, error => {
                //something went wrong 
                console.error("Error in ", error);
                reject(error);
            });
        });
    }

    //Resize an image to generate a standard thumbnail
    public generateThumbnail(image: string): Promise<string> {
        return this.resizeImage(image, 65);
    }

    //Resize an image to the generate an image with the max resolution for the SWI App
    public async generateImage(image: string): Promise<string> {
        //First check that the image is already > than the prescribed max resolution
        var maxRes = await this.getMaxResolutionOfImage(image);
        if (maxRes > 600) {
            return this.resizeImage(image, 600);
        } else {
            return image
        }
    }

    //Check image prefix
    public checkImagePrefix(image: string): string {
        if (!image) return null;
        if (!image.startsWith('data:')) {
            image = 'data:image/jpg;base64,' + image;
        }
        return image;
    }

    //Strips the data prefix from a dataURI string
    public stripDataPrefix(image: string): string {
        let img: string;
        if (image.startsWith('data:image/png;base64,')) {
            img = image.substr(22, image.length - 22);
            // console.log("First 30 chars of stripped image", img.substr(0, 30));
        }
        if (image.startsWith('data:image/jpg;base64,')) {
            img = image.substr(22, image.length - 22);
            // console.log("First 30 chars of stripped image", img.substr(0, 30));
        }
        if (image.startsWith('data:;base64,')) {
            img = image.substr(13, image.length - 13);
            // console.log("First 13 chars of stripped image", img.substr(0, 13));
        }

        return (img) ? img : image;
    }

    //Converts a data URI to a blob
    public dataURItoBlob(dataURI: string): Blob {
        // convert base64 to raw binary data held in a string
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        //New Code
        return new Blob([ab], { type: mimeString });
    }

    //Converts a blob or file to a DataURI
    public blobToDataURI(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(this.stripDataPrefix(reader.result));
            };
        });
    }

    public getMaxResolutionOfImage(image: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            let img = new Image();
            img.onload = function () {
                resolve((img.width >= img.height) ? img.width : img.height);
            }
            img.src = image;
        });
    }

    public async getImageSize(swiImg: SWIImage) {
        let img = new Image();
        img.onload = function () {
            console.log(`Width: ${img.width} x ${img.height}`);
        }
        img.src = swiImg.value;
    }
}