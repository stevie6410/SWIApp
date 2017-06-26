import { Injectable } from '@angular/core';
import { SWIHeader, SWIImage } from '../models/app.models';
import Dexie from 'dexie';
import { SWIDBService } from "./swi-db.service";
import { ImageService } from "./image.service";
import { RepoDocsService } from "./repo-docs.service";
import { ImageStoreService } from "./image-store.service";
import { ImagePlaceholder } from "assets/image-placeholder";
import { MD5 } from "crypto-js";
import { EnvironmentService } from "app/app/services/environment.service";

@Injectable()
export class SWIFileService {

    table: Dexie.Table<SWIHeader, string>;

    constructor(
        private db: SWIDBService,
        private imageService: ImageService,
        private imageStore: ImageStoreService,
        private repoDocs: RepoDocsService,
        private environment: EnvironmentService
    ) {
        this.table = this.db.table('swis');
    }

    getAll() {
        return this.table.toArray();
    }

    async add(swi: SWIHeader, compress: boolean = false, overrideSyncWithImageStore: boolean = false): Promise<SWIHeader> {
        if (!overrideSyncWithImageStore) await this.imageStore.addAll(swi, swi.id, compress);
        try {
            swi.appVersion = await this.environment.getAppVersion();
            swi.updatedOn = new Date();
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
        swi.appVersion = await this.environment.getAppVersion();
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

    getFileHash(swi: SWIHeader): string {
        return MD5(JSON.stringify(swi)).toString();
    }
}
