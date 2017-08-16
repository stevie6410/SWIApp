import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from "@angular/core";
import { ModalModule } from "angular2-modal";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";
import { MomentModule } from "angular2-moment";
import { PrimengModule } from "app/primeng";

import {
  AppCatalogService,
  ImageService,
  ImageStoreService,
  RepoDocsService,
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
  PermissionGuard,
  UsersService,
  RolesService,
  PermissionsService,
  CompaniesService,
  ApplicationsService,
  SWIImportService
} from "./index";

@NgModule({
  declarations: [],
  imports: [
    ModalModule.forRoot(),
    BootstrapModalModule,
    MomentModule,
    PrimengModule
  ],
  providers: [
    AppCatalogService,
    ImageService,
    ImageStoreService,
    RepoDocsService,
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
    UsersService,
    RolesService,
    PermissionsService,
    CompaniesService,
    ApplicationsService,
    PermissionGuard,
    SWIImportService
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

