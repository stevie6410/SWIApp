
export class Application {
  id: number;
  name: string;
  timeout: number;
  tokenRefreshLimit: number;
  maxTokenLifespan: number;
  appId: string;
}

export class ApplicationUserExtended {
  id: number;
  name: string;
  timeout: number;
  tokenRefreshLimit: number;
  maxTokenLifespan: number;
  appId: string;
  userPermissions: Permission[];
}

export class ApplicationExtended {
  id: number;
  name: string;
  timeout: number;
  tokenRefreshLimit: number;
  maxTokenLifespan: number;
  appId: string;
  roles: Role[];
}

export class CreateApplication {
  name: string;
  timeout: number;
  tokenRefreshLimit: number;
  maxTokenLifespan: number;
  appId: string;
}


export class Permission {
  id: number;
  name: string;
  description: string;
}

export class CreatePermission {
  name: string;
  description: string;
  roleId: number;
}

export class Role {
  id: number;
  name: string;
  description: string;
  application: Application;
  permissions: Permission[];
}

export class CreateRole {
  name: string;
  description: string;
  applicationId: number;
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  company: Company;
  defaultCompany: number;
  isLocalAccount: boolean;
  applications: ApplicationExtended[];
  roles: Role[];
}

export class CreateUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  isLocalAccount: boolean;
  defaultCompanyId: number;
}

export class Company {
  id: number;
  name: string;
  erpName: string;
  description: string;
}

export class UpdatePassword {
  username: string;
  currentPassword: string;
  newPassword: string;
}

export class ResetPassword {
  username: string;
  newPassword: string;
}

export class UserSearchFilter {
  username: string;
  firstName: string;
  lastName: string;
  isLocal?: boolean;
  isDisabled?: boolean;
  appId: number;
  roleId: number;
  defaultCompanyId: number;

  constructor() {
    this.isLocal = null;
    this.isDisabled = null;
  }
}
