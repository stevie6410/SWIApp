export class SwiUser{
    Id: number;
    FirstName: string;
    LastName: string;
    Username: string;
    DefaultCompany: SwiCompany;
    Role: SwiRole;
}

export class SwiRole{
    Id: number;
    RoleName: string;               // e.g. Basic User, Author, Approver, Manager
    Permissions: SwiPermission[];   //List of permissions given to each role
}

export class SwiPermission{
    Id: number;
    Name: string;                   // e.g. CanEditSWI
    Description: string;            // e.g. Allows the user to edit SWIs
}

export class SwiCompany{
    Id: number;
    Name: string;                   // e.g. SAO Leighton Buzzard
    ErpName: string;                // e.g. 00250
    Description: string;            // e.g. Leighton Buzzard Aftermarket
}

export class ClientSecurityToken{
    token: string;
    expiresOn: Date;
}
