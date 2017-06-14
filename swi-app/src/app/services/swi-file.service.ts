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

    async add(swi: SWIHeader, compress: boolean = false, overrideSyncWithImageStore: boolean = false): Promise<SWIHeader> {
        if (!overrideSyncWithImageStore) await this.imageStore.addAll(swi, swi.id, compress);
        try {
            let newSWI = await this.table.add(swi);
            return this.table.get(newSWI);    
        } catch (error) {
            console.log("Could not add SWI to store", error);
            return null;;
        }
    }

    deleteSWI(id: string): Promise<void> {
        return this.table.delete(id);
    }

    async update(swi: SWIHeader): Promise<SWIHeader> {
        console.log("Saving file");
        swi.updatedOn = new Date();
        await this.imageStore.addAll(swi, swi.id);
        swi.clientHash = this.getFileHash(swi);
        await this.table.update(swi.id, swi);
        this.imageStore.addAll(swi, swi.id);
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
