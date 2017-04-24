import { Injectable } from '@angular/core';
import { SWIHeader } from '../models/app.models';
import Dexie from 'dexie';
import { SWIDBService } from "../modules/core/swi-db.service";

//TODO: Rewite this service using IndexedDB for storage. Ref: SWI-67
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
        return this.table.add(swi);
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