import Dexie from 'dexie';

export class SWIDBService extends Dexie {
    constructor() {
        super('swidb');
        this.version(1).stores({
            swis: 'id',
            appConfig: 'id++',
            imageStore: 'key'
        });
    }
}