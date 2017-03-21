import { SwiUser, SwiCompany } from './swi-security.models';

export class SWI {
    id: number;
    sequence: number;
    title: string;
    revision: string;
    released: boolean;
    author: SwiUser;
    expert: SwiUser;
    approver: SwiUser;
    company: SwiCompany;
    swihsItems: SWIHSItem[];
    swiTools: SWITool[];
    swiStages: SWIStage[];
    swiTags: SWITag[];
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
    text: string;
    imageCaption: string;
    image: any;
    criticalStep: boolean;
    carePoint: string;
    hyperlink: string;
    relatedSwi: SWI;
    observations: SWIObservation[];
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