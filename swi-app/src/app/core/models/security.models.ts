export class SWIUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  defaultCompany: SWICompany;
  role: SWIRole;
}

export class SWIRole {
  id: string;
  name: string;               // e.g. Basic User, Author, Approver, Manager
  permissions: SWIPermission[];   // List of permissions given to each role
}

export class SWIPermission {
  id: string;
  name: string;                   // e.g. CanEditSWI
  description: string;            // e.g. Allows the user to edit SWIs
}

export class SWICompany {
  id: string;
  name: string;                   // e.g. SAO Leighton Buzzard
  erpName: string;                // e.g. 00250
  description: string;            // e.g. Leighton Buzzard Aftermarket
}

export class ClientSecurityToken {
  token: string;
  expiresOn: Date;
}

export class AuthUser {
  username: string;
  fullName: string;
  role: string;
  permissions: Permission[];
  expiresOn: Date;
  isExpired: boolean;
}

export class Permission {
  Name: string;
  Description: string;
}
