import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SWIDBService } from './services/swi-db.service'
import { PackageService } from './services/package.service'
import { AppCatalogService } from './services/app-catalog.service'
import { HSItemsResolver } from "./resolvers/hs-items.resolver";
import { SWIResolver } from "./resolvers/swi.resolver";
import { SWIsResolver } from "./resolvers/swis.resolver";
import { TooltipModule } from "ngx-tooltip";
import { ModalModule } from "angular2-modal";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";
import { ToastModule, ToastOptions } from "ng2-toastr";
import { ToastCustomOptions } from './toastr.options';
import { MomentModule } from "angular2-moment";

@NgModule({
    declarations: [],
    imports: [
        TooltipModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        ToastModule.forRoot(),
        MomentModule
    ],
    providers: [
        HSItemsResolver,
        SWIResolver,
        SWIsResolver,
        SWIDBService,
        PackageService,
        AppCatalogService,
        { provide: ToastOptions, useClass: ToastCustomOptions }
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

