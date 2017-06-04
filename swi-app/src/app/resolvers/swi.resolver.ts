import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SWIFileService } from '../services/swi-file.service';
import { SWIHeader } from "../models/app.models";

@Injectable()
export class SWIResolve implements Resolve<SWIHeader> {

    constructor(
        private swiFileService: SWIFileService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.swiFileService.getFile(route.paramMap.get('id'));
    }
}

