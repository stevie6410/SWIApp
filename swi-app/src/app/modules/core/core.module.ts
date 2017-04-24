import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SWIDBService } from './swi-db.service'

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        SWIDBService
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

