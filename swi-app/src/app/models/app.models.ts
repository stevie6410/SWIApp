import { SwiUser, SwiCompany } from './security.models';

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
    author: SwiUser;
    expert: SwiUser;
    approver: SwiUser;
    company: SwiCompany;
    swihsItems: SWIHSItem[];
    swiTools: SWITool[];
    swiStages: SWIStage[];
    swiTags: SWITag[];
    swiImages: SWIImage[]

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
    Id: number;
    Name: string;
    Image: any;
    PrintMessage: string;
    Company: SwiCompany;
}

export class SWITool {
    Id: number;
    Name: string;
    Caption: string;
    Image: any;
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
    }
}

export class SWIObservation {
    Id: number;
    SwiStage: SWIStage;
    Text: string;
    Image: any;
    JobNumber: string;
    CreatedBy: SwiUser;
    CreatedOn: Date;
    ModifiedBy: SwiUser;
    ModifiedOn: Date;
}

export class SWITag {
    Id: number;
    Name: string;
}