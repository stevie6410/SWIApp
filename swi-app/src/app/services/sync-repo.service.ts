import { Injectable } from '@angular/core';
import { SWIHeader } from "app/models/app.models";
import { CreateSWIMaster, RepoDocument, SWIMaster } from "app/models/repo.models";
import { RepoDocsService } from "./repo-docs.service";
import { SWIFileService } from "./swi-file.service";
import { ImageStoreService } from "./image-store.service";

@Injectable()
export class SyncRepoService {

    constructor(
        private repoDocs: RepoDocsService,
        private swiFileService: SWIFileService,
        private imageStore: ImageStoreService
    ) { }

    public async syncSWI(swi: SWIHeader, revId: string, createMaster: CreateSWIMaster = null): Promise<SWIHeader> {
        //Get the SWI Images embedded into the SWI
        swi = await this.imageStore.emmbedImagesIntoSWI(swi);
        console.log("swi after embedded", swi);

        //Update the swi UpdatedOn fields
        swi.updatedOn = new Date();

        //Check to see if the SWI is already attached to an SWIMaster from the repo
        if (!swi.swiMaster) {
            //Setup the new SWIMaster and attach it to the SWI
            if (!createMaster) {
                createMaster = new CreateSWIMaster();
                createMaster.appVersion = "0.7.0";
                createMaster.title = swi.title;
                createMaster.typeId = 1;
                createMaster.userId = 1;
            }
            //Send the request to the repo
            let master = await this.repoDocs.createMaster(createMaster);
            //Set the revId to the new SWIRevision
            revId = master.swiRevisions[0].id;
            //Check that the master was created
            if (master) {
                //Set the repo detials on the header
                swi = await this.setRepoFieldsOnHeader(swi, master, master.swiRevisions[0].id);
                console.log("swi before upload", swi);
                //Save the file to the newley created SWI
                await this.repoDocs.attatchSWIFile(master.id, revId, swi).toPromise();
            }
            return swi;
        } else {
            //Get the SWIMaster from the repo 
            let master = await this.repoDocs.getMaster(swi.swiMaster.id).toPromise();
            //Get the revision
            let revision = master.swiRevisions.filter(rev => rev.id == revId)[0];
            //Validate that we have the revision and that the revision has a linked document
            if (!revision) throw new Error(`SWI revison could not be found in the SWI Master: ${revId}`);
            //Set the SWIHeader with updated repo 
            swi = await this.setRepoFieldsOnHeader(swi, master, revId);
            //Upload the SWI file to the document 
            let result: SWIMaster = await this.repoDocs.attatchSWIFile(master.id, revision.id, swi).toPromise();
            return swi;
        }
    }

    private async setRepoFieldsOnHeader(swi: SWIHeader, master: SWIMaster, revId: string): Promise<SWIHeader> {
        swi.swiMaster = master;
        swi.swiRevisionId = revId;
        swi.clientHash = this.swiFileService.getFileHash(swi);
        swi = await this.swiFileService.saveFile(swi);
        return swi;
    }
}