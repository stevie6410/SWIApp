import { SWIUser, SWICompany, SWIPermission } from './security.models';
import { SWIMaster } from "./repo.models";

export class EnvironmentConfiguration {
    environment: string;
    version: string;
    buildNumber: string;
    repositoryURL: string;
}

export class AppCatalog {
    id: number;
    lastSync: Date;
    repositoryUrl: string;
    version: number;
    categories: SWICategory[];
    users: SWIUser[];
    sites: SWICompany[];
    permissions: SWIPermission[];
    hsIcons: SWIHSItem[];
}

export class SWICategory {
    id: number;
    name: string;
    description: string;
}

export class SWIHeader {
    id: string;
    swiMaster: SWIMaster;
    swiRevisionId: string;
    clientHash: string;
    appVersion: string;
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
    stageGroups: SWIStageGroup[];
    swihsItems: SWIHSItem[];
    swiTools: SWITool[];
    swiStages: SWIStage[];
    swiTags: SWITag[];
    swiImages: SWIImage[];
    swiLinkedERPParts: SWIERPPart[];
    category: string;
    upgradeTasks: string[];

    constructor(title: string) {
        this.title = title;
        this.revision = "1";
        this.swiImages = [];
        this.swiStages = [];
        this.swiTags = [];
        this.swiTools = [];
        this.swihsItems = [];
        this.swiLinkedERPParts = [];
        this.stageGroups = [];
        this.stageGroups.push(new SWIStageGroup("Default Stage Group"));
        this.createdOn = new Date();
        this.updatedOn = new Date();
        this.id = new GUID().value;
        this.filename = this.id + '.swi';
        this.upgradeTasks = [];
    }
}

export class SWIImage {
    constructor(rawImage: string) {
        this.key = new GUID().value;
        // this.value = rawImage;
        this.value = rawImage;
    }
    key: string;
    // value: string;
    value: string;
    thumbnail: string;
}

export class SWIStoreImage extends SWIImage {
    swiKey: string;
}
export class SWIStageGroup {
    id: string;
    name: string;
    sequence: number;
    tools: SWITool[];
    stages: SWIStage[];
    constructor(name: string) {
        this.id = new GUID().value;
        this.name = name;
        this.tools = [];
        this.stages = [];
    }
}

export class SWIERPPart {
    partNumber: string;
    itemNumber: number;
    partRevision: string;
    erpSystem: string;
}


export class SWIHSItem {
    id: string;
    name: string;
    imageType: string;
    image: string;
    printMessage: string;
    company: SWICompany;

    constructor() {
        this.id = new GUID().value;
    }
}

export class SWITool {
    id: string;
    name: string;
    image: string;
    hasCarePoint: boolean;
    carePoint: string;

    constructor(name: string) {
        this.name = name;
        this.id = new GUID().value;
        this.hasCarePoint = false;
    }
}

export class SWIStage {
    id: string;
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
        this.id = new GUID().value;
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

export class ToolingSearchCriteria {
    toolNumber: number;
    term: string;
    hasCarePoint: boolean;
    hasLinkedSWI: boolean;
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

export function hasChanges(swi: SWIHeader, initalState: number): boolean {
    if (generateHash(JSON.stringify(swi)) == initalState) {
        console.log("SWI up to date");
        return false;
    } else {
        console.log("SWI Changed");
        return true;
    }
}

export function generateHash(obj: any) {
    var hash = 0, i, chr;
    if (obj.length === 0) return hash;
    for (i = 0; i < obj.length; i++) {
        chr = obj.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

