export class RepoDocument {
  id: number;
  name: string;
  createdOn: Date;
  createdBy: RepoUser;
  checkedOut: boolean;
  checkedOutBy: RepoUser;
  checkedOutOn: Date;
  file: RepoFile;
  hash: string;
  clientHash: string;
  timestamp: Date;
  fileSize: number;
  documentPartLinks: RepoDocumentPartLink[];
  documentChanges: DocumentChange[];
}

export class DocumentChange {
  documentId: number;
  changedBy: string;
  changedOn: Date;
  changeOperation: string;
  changeNotes: string;
}

export class RepoFile {
  data: string;
}

export class SimpleRepoDocument {
  id: number;
  name: string;
  createdOn: Date;
  createdBy: string;
  checkedOut: boolean;
  checkedOutBy: string;
  checkedOutOn: Date;
  hash: string;
  fileSize: number;
}

export class RepoDocumentPartLink {
  id: number;
  partNumber: string;
  revision: string;
  erpSystemId: number;
}

export class RepoUser {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  defaultSite: RepoSite;
}

export class RepoSite {
  id: number;
  name: string;
  description: string;
}

export class CreateDocument {
  name: string;
  username: string;
  documentTypeId: number;
  appVersion: string;
  swiFile: string;
  message: string;
}

export class CreateSWIMaster {
  id: string;
  title: string;
  typeId: number;
  username: string;
  appVersion: string;
  swiFile: string;
  swiFileId: string;
}

export class SWIMaster {
  id: string;
  title: string;
  swiNumber: number;
  isPublic: boolean;
  createdBy: string;
  createdOn: Date;
  type: string;
  swiRevisions: SWIRevision[];
  sitePermissions: SWIMasterSitePermission[];
  latestRevision: SWIRevision;

  get lastUpdatedOn(): Date {
    if (this.swiRevisions == null || this.swiRevisions.length <= 0) { return null; }
    return new Date(Math.max(...this.swiRevisions.map(r => r.modifiedOn.getUTCMilliseconds())));
  }
}

export class CreateSWIRevision {
  swiMasterId: number;
  appVersion: string;
  username: string;
  swiFileId: string;
}

export class SWIRevision {
  id: string;
  revisionNumber: number;
  released: boolean;
  isLatest: boolean;
  appVersion: string;
  swiFileId: string;
  createdOn: Date;
  modifiedOn: Date;
  document: RepoDocument;
}


export class SWIMasterSitePermission {
  id: string;
  swiMasterId: number;
  site: RepoSite;
  canRead: boolean;
  canAuthor: boolean;
  canManage: boolean;
  isOwner: boolean;
  grantedBy: string;
  grantedOn: Date;
  notes: string;
}

export class SWIType {
  id: number;
  name: string;
  description: string;
}

export class StandardTool {
  id: number;
  name: string;
  image: string;
  hasCarePoint: boolean;
  carePoint: string;
  swiMaster: SWIMaster;
}

export class CreateStandardTool {
  name: string;
  image: string;
  hasCarePoint: boolean;
  carePoint: string;
  swiMasterId: string;
}

export class CheckInRequest {
  docId: number;
  message: string;
}

export class CheckOutRequest {
  docId: number;
}
