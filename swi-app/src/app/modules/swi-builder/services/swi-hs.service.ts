import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { SWIHSItem } from "../../../models/app.models";

@Injectable()
export class SWIHSItemService {

    private hsItemSelection = new Subject<SWIHSItem[]>();
    public itemSelection = this.hsItemSelection.asObservable();

    private _catalogItems: SWIHSItem[] = [];

    constructor() {
        this.updateCatalogeItems();
    }

    updateCatalogeItems() {
        //TODO: Create a service to provide catalog items Ref: SWI-74
        // this._catalogItems = require('../../../../assets/swi-hs-items.json');
    }

    public getCatalogItems(): SWIHSItem[] {
        return this._catalogItems;
    }

    newPickerSelection(items: SWIHSItem[]) {
        this.hsItemSelection.next(items);
    }
}