import { Injectable } from '@angular/core';
import { SWIHeader, SWIImage } from '../models/app.models';
import Dexie from 'dexie';
import { SWIDBService } from "../modules/core/swi-db.service";
import { ImageService } from "./image.service";
import { RepoDocsService } from "./repo-docs.service";
import { ImageStoreService } from "./image-store.service";
import { ImagePlaceholder } from "../../assets/image-placeholder";
import { MD5 } from "crypto-js";

@Injectable()
export class SWIFileService {

    table: Dexie.Table<SWIHeader, string>;

    constructor(
        private db: SWIDBService,
        private imageService: ImageService,
        private imageStore: ImageStoreService,
        private repoDocs: RepoDocsService
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

    async saveFile(swi: SWIHeader): Promise<SWIHeader> {
        console.log("Saving file");
        swi.updatedOn = new Date();
        swi = await this.imageStore.sync(swi);
        swi.clientHash = this.getFileHash(swi);
        await this.table.update(swi.id, swi);
        this.imageStore.sync(swi);
        return swi;
    }

    getFile(id: string): Promise<SWIHeader> {
        return this.table.get(id);
    }

    getAllFiles(): Promise<SWIHeader[]> {
        return this.table.toArray();
    }

    cleanupSWI(swi: SWIHeader): SWIHeader {
        // swi = this.imageStore.clean(swi);
        return swi;
    }

    getFileHash(swi: SWIHeader): string {
        return MD5(JSON.stringify(swi)).toString();
    }
}
