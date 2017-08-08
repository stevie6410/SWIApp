import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from "@angular/core";
import { ModalModule } from "angular2-modal";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";
import { MomentModule } from "angular2-moment";

import {
    AppCatalogService,
    ImageService,
    ImageStoreService,
    RepoDocsService,
    RepoSwiService,
    SWIDBService,
    SWIDuplicateService,
    SWIFileService,
    SyncRepoService,
    HSItemsResolver,
    SWIResolver,
    SWIsResolver,
    RepoStandardToolingService,
    SwiUpgradeService,
    AuthService,
    AuthGuard
} from "./index";
import { UsersService } from "app/core/services/users.service";

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
        RepoDocsService,
        RepoSwiService,
        SWIDBService,
        SWIDuplicateService,
        SWIFileService,
        SyncRepoService,
        HSItemsResolver,
        SWIResolver,
        SWIsResolver,
        RepoStandardToolingService,
        SwiUpgradeService,
        AuthService,
        AuthGuard,
        UsersService
    ],
    bootstrap: []
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error("CoreModule is already loaded. Import it in the AppModule only");
        }
    }
}

