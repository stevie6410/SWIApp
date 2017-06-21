import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ModalModule } from "angular2-modal";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";
import { MomentModule } from "angular2-moment";

import {
    AppCatalogService,
    ImageService,
    ImageStoreService,
    PackageService,
    RepoDocsService,
    RepoSwiService,
    SWIDBService,
    SWIDuplicateService,
    SWIFileService,
    SyncRepoService,
    HSItemsResolver,
    SWIResolver,
    SWIsResolver
} from "./index";

@NgModule({
    declarations: [],
    imports: [
        ModalModule.forRoot(),
        BootstrapModalModule,
        MomentModule
    ],
    providers: [
        AppCatalogService,
        ImageService,
        ImageStoreService,
        PackageService,
        RepoDocsService,
        RepoSwiService,
        SWIDBService,
        SWIDuplicateService,
        SWIFileService,
        SyncRepoService,
        HSItemsResolver,
        SWIResolver,
        SWIsResolver,
    ],
    bootstrap: []
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}

