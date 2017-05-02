import { Injectable } from '@angular/core';
import { SWIHeader } from '../models/app.models';
import Dexie from 'dexie';
import { SWIDBService } from "../modules/core/swi-db.service";
import { ImagePlaceholder } from "../../assets/image-placeholder";

@Injectable()
export class SWIFileService {

    table: Dexie.Table<SWIHeader, string>;

    constructor(private db: SWIDBService) {
        this.table = this.db.table('swis');
    }

    getAll() {
        return this.table.toArray();
    }

    createSWI(swi: SWIHeader): Promise<SWIHeader> {
        return this.table.add(swi).then();
    }

    saveFile(swi: SWIHeader): Promise<number> {
        swi.updatedOn = new Date();
        return this.table.update(swi.id, swi);
    }

    getFile(id: string): Promise<SWIHeader> {
        return this.table.get(id);
    }

    getAllFiles(): Promise<SWIHeader[]> {
        return this.table.toArray();
    }

    cleanupSWI(swi: SWIHeader): SWIHeader {
        swi = this.cleanupSWIImages(swi);
        return swi;
    }

    public getImageFromStore(swi: SWIHeader, key: string): string {
        if (!key) return ImagePlaceholder;
        try {
            let result = swi.swiImages.filter(i => i.key == key)[0];
            if (result) {
                if (!result.value.startsWith('data:image')) {
                    // console.log("Image with no data:image prefix. Key is: ", result.key);
                    result.value = 'data:image/jpg;base64,' + result.value;
                }
                // console.log("result.value", result);
                return result.value;
            }
        } catch (error) {
            return ImagePlaceholder;
        }
    }

    private cleanupSWIImages(swi: SWIHeader): SWIHeader {

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

}