import { Injectable } from '@angular/core';
import { ImageStoreService } from "./image-store.service";
import { SWIFileService } from "./swi-file.service";
import { SWIHeader, SWIImage, SWIStoreImage, GUID } from "../models/app.models";

@Injectable()
export class SWIDuplicateService {

    constructor(
        private imageStore: ImageStoreService,
        private swiStore: SWIFileService
    ) { }

    public async duplicate(swi: SWIHeader, newTitle: string): Promise<SWIHeader> {
        // Get a copy of the SWIHeader
        let newSWI: SWIHeader = JSON.parse(JSON.stringify(swi));
        newSWI.id = new GUID().value;
        newSWI.swiMaster = null;
        newSWI.swiRevisionId = null;
        newSWI.title = newTitle;

        //Get all of the image keys and make copies
        newSWI.coverImage = await this.imageStore.duplicateImage(newSWI.coverImage, newSWI.id);
        for (let tool of newSWI.swiTools) {
            tool.image = await this.imageStore.duplicateImage(tool.image, newSWI.id);
        }
        for (let stage of newSWI.swiStages) {
            stage.image = await this.imageStore.duplicateImage(stage.image, newSWI.id);
        }

        //Create the new SWI
        let result = await this.swiStore.add(newSWI);
        return result;
    }
}