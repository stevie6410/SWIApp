import { SWIUser, SWICompany } from './security.models';

export class SWIHeader {
    id: string;
    filename: string;
    sequence: number;
    title: string;
    description: string;
    coverImage: string;
    revision: string;
    released: boolean;
    updatedOn: Date;
    createdOn: Date;
    author: SWIUser;
    expert: SWIUser;
    approver: SWIUser;
    company: SWICompany;
    swihsItems: SWIHSItem[];
    swiTools: SWITool[];
    swiStages: SWIStage[];
    swiTags: SWITag[];
    swiImages: SWIImage[]
    category: string;

    constructor(title: string) {
        this.title = title;
        this.revision = "A";
        this.swiImages = [];
        this.swiStages = [];
        this.swiTags = [];
        this.swiTools = [];
        this.swihsItems = [];
        this.createdOn = new Date();
        this.updatedOn = new Date();
        this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export class SWIImage {
    constructor(value: string) {
        this.key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        this.value = value;
    }
    key: string;
    value: string;
}

export class SWIHSItem {
    id: string;
    name: string;
    imageType: string;
    image: string;
    printMessage: string;
    company: SWICompany;

    constructor() {
        this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export class SWITool {
    id: string;
    name: string;
    image: string;

    constructor(name: string) {
        this.name = name;
        this.id = new GUID().value;
    }
}

export class SWIStage {
    id: number;
    sequence: number;
    summary: string;
    description: string;
    imageCaption: string;
    image: any;
    criticalStep: boolean;
    carePoint: string;
    hyperlink: string;
    relatedSwi: SWIHeader;
    observations: SWIObservation[];

    constructor() {
        this.observations = [];
        this.criticalStep = false;
    }
}

export class SWIObservation {
    id: number;
    swiStage: SWIStage;
    text: string;
    image: any;
    jobNumber: string;
    createdBy: SWIUser;
    createdOn: Date;
    modifiedBy: SWIUser;
    modifiedOn: Date;
}

export class SWITag {
    id: number;
    name: string;
}

export class GUID {
    value: string;
    constructor() {
        this.value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}