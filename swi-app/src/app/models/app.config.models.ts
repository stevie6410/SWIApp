import { SWIHSItem, SWICategory } from "./app.models";
import { SWIUser, SWICompany, SWIPermission, SWIRole } from "./security.models";

export class SWIAppConfig {
    swiRepoName: string; 
    swiRepository: string;
    lastSync: Date;
    swiCategories: SWICategory[];
    swiUsers: SWIUser[];
    swiCompanies: SWICompany[];
    swiPermissions: SWIPermission[];
    swiHSItems: SWIHSItem[];
}