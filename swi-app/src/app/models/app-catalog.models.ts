import { SWIHSItem } from "./app.models";
import { SWIUser, SWICompany, SWIPermission, SWIRole } from "./security.models";

export class AppCatalog {
    id: number;
    lastSync: Date;
    repositoryUrl: string;
    version: number;
    categories: SWICategory[];
    users: SWIUser[];
    sites: SWICompany[];
    swiPermissions: SWIPermission[];
    swiHSItems: SWIHSItem[];
}

export class SWICategory {
    id: number;
    name: string;
    description: string;   
}