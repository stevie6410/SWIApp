import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { StandardTool, RepoStandardToolingService } from "app/core";

@Injectable()
export class SWIStandardToolResolver implements Resolve<StandardTool> {

    constructor(
        private toolingStore: RepoStandardToolingService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        let id: number = +route.paramMap.get('id');
        return this.toolingStore.get(id);
    }
}

