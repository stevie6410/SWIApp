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

  async getAllKeys(): Promise<string[]> {
    const keys = [];
    await this.table.toCollection().keys(key => key.forEach(k => keys.push(k.toString())));
    return keys;
  }

  async import(swi: SWIHeader): Promise<SWIHeader> {
    try {
      if (!swi.appVersion) { swi.appVersion = "0.1.0"; }
      return this.add(swi, true, true);
    } catch (error) {
      console.log("Cannot import 123");
    }
  }

  async add(swi: SWIHeader, compress: boolean = false, overrideSyncWithImageStore: boolean = false): Promise<SWIHeader> {
    if (!overrideSyncWithImageStore) { await this.imageStore.addAll(swi, swi.id, compress); }
    try {
      if (!swi.appVersion) { swi.appVersion = this.environment.getAppVersion(); }
      // swi.updatedOn = new Date();
      const newSWI = await this.table.add(swi);
      return this.table.get(newSWI);
    } catch (error) {
      console.log("Could not add SWI to store", error);
      throw error;
    }
  }

  deleteSWI(id: string): Promise<void> {
    return this.table.delete(id);
  }

  async update(swi: SWIHeader, clientHash: string = null): Promise<SWIHeader> {
    console.log("Saving file");
    // swi.updatedOn = new Date();
    // swi.appVersion = await this.environment.getAppVersion();
    // await this.imageStore.addAll(swi, swi.id);
    swi.clientHash = (clientHash) ? clientHash : this.getFileHash(swi);
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
    const swiCopy: SWIHeader = JSON.parse(JSON.stringify(swi));
    swiCopy.swiImages = [];
    // console.log("SWICopy", swiCopy);
    return MD5(JSON.stringify(swiCopy)).toString();
  }
}
