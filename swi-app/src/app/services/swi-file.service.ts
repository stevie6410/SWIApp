import { Injectable } from '@angular/core';
import { SWIHeader, SWIImage } from '../models/app.models';
import Dexie from 'dexie';
import { SWIDBService } from "../modules/core/swi-db.service";
import { ImageService } from "./image.service";
import { ImageStoreService } from "./image-store.service";
import { ImagePlaceholder } from "../../assets/image-placeholder";

@Injectable()
export class SWIFileService {

    table: Dexie.Table<SWIHeader, string>;

    constructor(
        private db: SWIDBService,
        private imageService: ImageService,
        private imageStore: ImageStoreService
    ) {
        this.table = this.db.table('swis');
    }

    getAll() {
        return this.table.toArray();
    }

    createSWI(swi: SWIHeader): Promise<SWIHeader> {
        return new Promise<SWIHeader>((resolve, reject) => {
            this.imageStore.sync(swi).then(syncSWI => {
                this.table.add(swi)
                    .then(result => resolve(swi))
                    .catch(err => reject(err));
            });
        });
    }

    deleteSWI(id: string): Promise<void> {
        return this.table.delete(id);
    }

    saveFile(swi: SWIHeader): Promise<SWIHeader> {
        console.log("Saving file");
        return new Promise<SWIHeader>((resolve, reject) => {
            swi.updatedOn = new Date();
            this.imageStore.sync(swi)
                .then(syncSWI => {
                    console.log("File synced with image store, result: ", syncSWI)
                    this.table.update(syncSWI.id, syncSWI).then(value => {
                        resolve(syncSWI);
                    }).catch(err => console.log("Error updating database", err));
                }).catch(err => { console.log("Error syncing file with image store", err) });
        });
    }

    getFile(id: string): Promise<SWIHeader> {
        return this.table.get(id);
    }

    getAllFiles(): Promise<SWIHeader[]> {
        return this.table.toArray();
    }

    cleanupSWI(swi: SWIHeader): SWIHeader {
        swi = this.imageStore.clean(swi);
        return swi;
    }
}
