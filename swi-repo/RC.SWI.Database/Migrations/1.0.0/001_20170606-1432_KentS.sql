-- <Migration ID="0e6a56e2-ed1c-4fae-a866-55123a874bca" />
GO

PRINT N'Creating schemas'
GO
CREATE SCHEMA [security]
AUTHORIZATION [db_owner]
GO
CREATE SCHEMA [swi]
AUTHORIZATION [db_owner]
GO
PRINT N'Creating [security].[Permissions]'
GO
CREATE TABLE [security].[Permissions]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [varchar] (255) NOT NULL,
[Description] [varchar] (255) NULL
)
GO
PRINT N'Creating primary key [PK_Permissions] on [security].[Permissions]'
GO
ALTER TABLE [security].[Permissions] ADD CONSTRAINT [PK_Permissions] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[ApprovalAction]'
GO
CREATE TABLE [dbo].[ApprovalAction]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [varchar] (50) NOT NULL,
[Description] [nvarchar] (255) NULL,
[PermissionId] [int] NULL
)
GO
PRINT N'Creating primary key [PK_ApprovalAction] on [dbo].[ApprovalAction]'
GO
ALTER TABLE [dbo].[ApprovalAction] ADD CONSTRAINT [PK_ApprovalAction] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[ApprovalChange]'
GO
CREATE TABLE [dbo].[ApprovalChange]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[ApprovalRequestId] [int] NULL,
[ApprovalActionId] [int] NULL,
[ChangedBy] [int] NOT NULL,
[ChangedOn] [datetime2] NOT NULL,
[ChangeNotes] [varchar] (255) NULL
)
GO
PRINT N'Creating primary key [PK_ApprovalChange] on [dbo].[ApprovalChange]'
GO
ALTER TABLE [dbo].[ApprovalChange] ADD CONSTRAINT [PK_ApprovalChange] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[ApprovalRequests]'
GO
CREATE TABLE [dbo].[ApprovalRequests]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[RevisionId] [uniqueidentifier] NOT NULL,
[RequestedById] [int] NOT NULL,
[RequestedOn] [datetime2] NOT NULL,
[ApprovalStatusId] [int] NOT NULL,
[AssignedApprover] [int] NULL,
[ApprovalGroupId] [int] NOT NULL,
[ApprovalWorkflowId] [int] NULL
)
GO
PRINT N'Creating primary key [PK_ApprovalRequests] on [dbo].[ApprovalRequests]'
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [PK_ApprovalRequests] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[ApprovalGroups]'
GO
CREATE TABLE [dbo].[ApprovalGroups]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [varchar] (50) NOT NULL,
[Description] [varchar] (255) NULL,
[SiteId] [int] NULL
)
GO
PRINT N'Creating primary key [PK_ApprovalGroups] on [dbo].[ApprovalGroups]'
GO
ALTER TABLE [dbo].[ApprovalGroups] ADD CONSTRAINT [PK_ApprovalGroups] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[ApprovalGroupUsers]'
GO
CREATE TABLE [dbo].[ApprovalGroupUsers]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[ApprovalGroupId] [int] NOT NULL,
[UserId] [int] NOT NULL
)
GO
PRINT N'Creating primary key [PK_ApprovalGroupUsers] on [dbo].[ApprovalGroupUsers]'
GO
ALTER TABLE [dbo].[ApprovalGroupUsers] ADD CONSTRAINT [PK_ApprovalGroupUsers] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [security].[Users]'
GO
CREATE TABLE [security].[Users]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Username] [varchar] (50) NOT NULL,
[FirstName] [varchar] (50) NOT NULL,
[LastName] [varchar] (50) NOT NULL,
[EmailAddress] [varchar] (100) NOT NULL,
[DefaultSiteId] [int] NOT NULL
)
GO
PRINT N'Creating primary key [PK_Users] on [security].[Users]'
GO
ALTER TABLE [security].[Users] ADD CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[ApprovalStatus]'
GO
CREATE TABLE [dbo].[ApprovalStatus]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [varchar] (50) NOT NULL,
[Description] [varchar] (255) NULL,
[IsApproved] [bit] NOT NULL,
[isPending] [bit] NOT NULL,
[isRejected] [bit] NOT NULL,
[isCancelled] [bit] NOT NULL
)
GO
PRINT N'Creating primary key [PK_ApprovalStatus] on [dbo].[ApprovalStatus]'
GO
ALTER TABLE [dbo].[ApprovalStatus] ADD CONSTRAINT [PK_ApprovalStatus] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[ApprovalWorkflows]'
GO
CREATE TABLE [dbo].[ApprovalWorkflows]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [varchar] (50) NOT NULL,
[Description] [varchar] (255) NULL,
[CanSelfSign] [bit] NOT NULL,
[IsPriority] [bit] NOT NULL,
[IsDefault] [bit] NOT NULL
)
GO
PRINT N'Creating primary key [PK_ApprovalWorkflows] on [dbo].[ApprovalWorkflows]'
GO
ALTER TABLE [dbo].[ApprovalWorkflows] ADD CONSTRAINT [PK_ApprovalWorkflows] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [swi].[SWIRevisions]'
GO
CREATE TABLE [swi].[SWIRevisions]
(
[Id] [uniqueidentifier] NOT NULL,
[RevisionNumber] [int] NOT NULL,
[Released] [bit] NOT NULL,
[MasterId] [uniqueidentifier] NOT NULL,
[AppVersion] [varchar] (50) NOT NULL,
[CreatedOn] [datetime2] NOT NULL,
[ModifiedOn] [datetime2] NOT NULL,
[DocumentId] [int] NULL
)
GO
PRINT N'Creating primary key [PK_SWIRevisions] on [swi].[SWIRevisions]'
GO
ALTER TABLE [swi].[SWIRevisions] ADD CONSTRAINT [PK_SWIRevisions] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [security].[AuthTokens]'
GO
CREATE TABLE [security].[AuthTokens]
(
[Id] [uniqueidentifier] NOT NULL,
[UserId] [int] NOT NULL,
[IssuedOn] [datetime2] NOT NULL,
[ExpiresOn] [datetime2] NOT NULL
)
GO
PRINT N'Creating primary key [PK_AuthTokens] on [security].[AuthTokens]'
GO
ALTER TABLE [security].[AuthTokens] ADD CONSTRAINT [PK_AuthTokens] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[Documents]'
GO
CREATE TABLE [dbo].[Documents]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[DocumentTypeId] [int] NOT NULL,
[DataString] [varchar] (max) NULL,
[DataBinary] [varbinary] (max) NULL,
[CreatedOn] [datetime2] NOT NULL,
[ModifiedOn] [datetime2] NOT NULL,
[CreatedBy] [int] NOT NULL,
[ModifiedBy] [int] NOT NULL,
[Hash] [varchar] (1000) NULL,
[AppVersion] [varchar] (50) NULL,
[FileSize] [int] NULL,
[CheckedOut] [bit] NOT NULL,
[CheckedOutBy] [int] NOT NULL,
[CheckedOutOn] [nchar] (10) NULL
)
GO
PRINT N'Creating primary key [PK_Documents] on [dbo].[Documents]'
GO
ALTER TABLE [dbo].[Documents] ADD CONSTRAINT [PK_Documents] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[DocumentChanges]'
GO
CREATE TABLE [dbo].[DocumentChanges]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[DocumentId] [int] NOT NULL,
[ChangedOn] [datetime2] NOT NULL,
[ChangedById] [int] NOT NULL,
[ChangeNotes] [varchar] (255) NULL
)
GO
PRINT N'Creating primary key [PK_DocumentChanges] on [dbo].[DocumentChanges]'
GO
ALTER TABLE [dbo].[DocumentChanges] ADD CONSTRAINT [PK_DocumentChanges] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[DocumentLinks]'
GO
CREATE TABLE [dbo].[DocumentLinks]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[DocumentAd] [int] NOT NULL,
[DocumentBId] [int] NOT NULL,
[LinkNotes] [varchar] (255) NULL
)
GO
PRINT N'Creating primary key [PK_DocumentLinks] on [dbo].[DocumentLinks]'
GO
ALTER TABLE [dbo].[DocumentLinks] ADD CONSTRAINT [PK_DocumentLinks] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[DocumentPartLinks]'
GO
CREATE TABLE [dbo].[DocumentPartLinks]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[PartNumber] [varchar] (100) NOT NULL,
[Revision] [varchar] (10) NOT NULL,
[ErpSystemId] [int] NULL,
[DocumentId] [int] NOT NULL
)
GO
PRINT N'Creating primary key [PK_DocumentPartLinks] on [dbo].[DocumentPartLinks]'
GO
ALTER TABLE [dbo].[DocumentPartLinks] ADD CONSTRAINT [PK_DocumentPartLinks] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[ErpSystem]'
GO
CREATE TABLE [dbo].[ErpSystem]
(
[Id] [int] NOT NULL,
[Name] [varchar] (50) NOT NULL,
[Description] [varchar] (255) NULL
)
GO
PRINT N'Creating primary key [PK_ErpSystem] on [dbo].[ErpSystem]'
GO
ALTER TABLE [dbo].[ErpSystem] ADD CONSTRAINT [PK_ErpSystem] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [dbo].[DocumentTypes]'
GO
CREATE TABLE [dbo].[DocumentTypes]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [varchar] (50) NOT NULL,
[Description] [varchar] (255) NULL,
[AllowedFileExt] [nvarchar] (255) NULL,
[IsString] [bit] NOT NULL,
[IsBinary] [bit] NOT NULL,
[IsSWI] [bit] NOT NULL
)
GO
PRINT N'Creating primary key [PK_DocumentTypes] on [dbo].[DocumentTypes]'
GO
ALTER TABLE [dbo].[DocumentTypes] ADD CONSTRAINT [PK_DocumentTypes] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [security].[RolePermissions]'
GO
CREATE TABLE [security].[RolePermissions]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[RoleId] [int] NOT NULL,
[PermissionId] [int] NOT NULL
)
GO
PRINT N'Creating primary key [PK_RolePermissions] on [security].[RolePermissions]'
GO
ALTER TABLE [security].[RolePermissions] ADD CONSTRAINT [PK_RolePermissions] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [security].[Roles]'
GO
CREATE TABLE [security].[Roles]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [varchar] (100) NOT NULL,
[Description] [varchar] (255) NULL
)
GO
PRINT N'Creating primary key [PK_Roles] on [security].[Roles]'
GO
ALTER TABLE [security].[Roles] ADD CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [swi].[SWITypes]'
GO
CREATE TABLE [swi].[SWITypes]
(
[Id] [uniqueidentifier] NOT NULL,
[Name] [varchar] (255) NOT NULL,
[Description] [varchar] (255) NULL
)
GO
PRINT N'Creating primary key [PK_SWITypes] on [swi].[SWITypes]'
GO
ALTER TABLE [swi].[SWITypes] ADD CONSTRAINT [PK_SWITypes] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [swi].[SWIMasters]'
GO
CREATE TABLE [swi].[SWIMasters]
(
[Id] [uniqueidentifier] NOT NULL,
[Title] [varchar] (255) NOT NULL,
[SWINumber] [int] NOT NULL,
[SWIType] [uniqueidentifier] NOT NULL
)
GO
PRINT N'Creating primary key [PK_SWIMasters] on [swi].[SWIMasters]'
GO
ALTER TABLE [swi].[SWIMasters] ADD CONSTRAINT [PK_SWIMasters] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [security].[UserRoles]'
GO
CREATE TABLE [security].[UserRoles]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[UserId] [int] NOT NULL,
[RoleId] [int] NULL
)
GO
PRINT N'Creating primary key [PK_UserRoles] on [security].[UserRoles]'
GO
ALTER TABLE [security].[UserRoles] ADD CONSTRAINT [PK_UserRoles] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Creating [security].[Sites]'
GO
CREATE TABLE [security].[Sites]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [varchar] (50) NOT NULL,
[Description] [varchar] (255) NULL
)
GO
PRINT N'Creating primary key [PK_Sites] on [security].[Sites]'
GO
ALTER TABLE [security].[Sites] ADD CONSTRAINT [PK_Sites] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[ApprovalChange]'
GO
ALTER TABLE [dbo].[ApprovalChange] ADD CONSTRAINT [FK_ApprovalChange_ApprovalAction] FOREIGN KEY ([ApprovalActionId]) REFERENCES [dbo].[ApprovalAction] ([Id])
GO
ALTER TABLE [dbo].[ApprovalChange] ADD CONSTRAINT [FK_ApprovalChange_ApprovalRequests] FOREIGN KEY ([ApprovalRequestId]) REFERENCES [dbo].[ApprovalRequests] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[ApprovalAction]'
GO
ALTER TABLE [dbo].[ApprovalAction] ADD CONSTRAINT [FK_ApprovalAction_Permissions] FOREIGN KEY ([PermissionId]) REFERENCES [security].[Permissions] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[ApprovalGroupUsers]'
GO
ALTER TABLE [dbo].[ApprovalGroupUsers] ADD CONSTRAINT [FK_ApprovalGroupUsers_ApprovalGroups] FOREIGN KEY ([ApprovalGroupId]) REFERENCES [dbo].[ApprovalGroups] ([Id])
GO
ALTER TABLE [dbo].[ApprovalGroupUsers] ADD CONSTRAINT [FK_ApprovalGroupUsers_Users] FOREIGN KEY ([UserId]) REFERENCES [security].[Users] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[ApprovalRequests]'
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [FK_ApprovalRequests_ApprovalGroups] FOREIGN KEY ([ApprovalGroupId]) REFERENCES [dbo].[ApprovalGroups] ([Id])
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [FK_ApprovalRequests_SWIRevisions] FOREIGN KEY ([RevisionId]) REFERENCES [swi].[SWIRevisions] ([Id])
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [FK_ApprovalRequests_Users] FOREIGN KEY ([RequestedById]) REFERENCES [security].[Users] ([Id])
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [FK_ApprovalRequests_ApprovalStatus] FOREIGN KEY ([ApprovalStatusId]) REFERENCES [dbo].[ApprovalStatus] ([Id])
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [FK_ApprovalRequests_Users1] FOREIGN KEY ([AssignedApprover]) REFERENCES [security].[Users] ([Id])
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [FK_ApprovalRequests_ApprovalWorkflows] FOREIGN KEY ([ApprovalWorkflowId]) REFERENCES [dbo].[ApprovalWorkflows] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[DocumentChanges]'
GO
ALTER TABLE [dbo].[DocumentChanges] ADD CONSTRAINT [FK_DocumentChanges_Documents] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Documents] ([Id])
GO
ALTER TABLE [dbo].[DocumentChanges] ADD CONSTRAINT [FK_DocumentChanges_Users] FOREIGN KEY ([ChangedById]) REFERENCES [security].[Users] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[DocumentLinks]'
GO
ALTER TABLE [dbo].[DocumentLinks] ADD CONSTRAINT [FK_DocumentLinks_Documents] FOREIGN KEY ([DocumentAd]) REFERENCES [dbo].[Documents] ([Id])
GO
ALTER TABLE [dbo].[DocumentLinks] ADD CONSTRAINT [FK_DocumentLinks_Documents1] FOREIGN KEY ([DocumentBId]) REFERENCES [dbo].[Documents] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[DocumentPartLinks]'
GO
ALTER TABLE [dbo].[DocumentPartLinks] ADD CONSTRAINT [FK_DocumentPartLinks_ErpSystem] FOREIGN KEY ([ErpSystemId]) REFERENCES [dbo].[ErpSystem] ([Id])
GO
ALTER TABLE [dbo].[DocumentPartLinks] ADD CONSTRAINT [FK_DocumentPartLinks_Documents] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Documents] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[Documents]'
GO
ALTER TABLE [dbo].[Documents] ADD CONSTRAINT [FK_Documents_DocumentTypes] FOREIGN KEY ([DocumentTypeId]) REFERENCES [dbo].[DocumentTypes] ([Id])
GO
ALTER TABLE [dbo].[Documents] ADD CONSTRAINT [FK_Documents_Users] FOREIGN KEY ([CreatedBy]) REFERENCES [security].[Users] ([Id])
GO
ALTER TABLE [dbo].[Documents] ADD CONSTRAINT [FK_Documents_Users1] FOREIGN KEY ([ModifiedBy]) REFERENCES [security].[Users] ([Id])
GO
PRINT N'Adding foreign keys to [swi].[SWIRevisions]'
GO
ALTER TABLE [swi].[SWIRevisions] ADD CONSTRAINT [FK_SWIRevisions_Documents] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Documents] ([Id])
GO
ALTER TABLE [swi].[SWIRevisions] ADD CONSTRAINT [FK_SWIRevisions_SWIMasters] FOREIGN KEY ([MasterId]) REFERENCES [swi].[SWIMasters] ([Id])
GO
PRINT N'Adding foreign keys to [security].[AuthTokens]'
GO
ALTER TABLE [security].[AuthTokens] ADD CONSTRAINT [FK_AuthTokens_Users] FOREIGN KEY ([UserId]) REFERENCES [security].[Users] ([Id])
GO
PRINT N'Adding foreign keys to [security].[RolePermissions]'
GO
ALTER TABLE [security].[RolePermissions] ADD CONSTRAINT [FK_RolePermissions_Permissions] FOREIGN KEY ([PermissionId]) REFERENCES [security].[Permissions] ([Id])
GO
ALTER TABLE [security].[RolePermissions] ADD CONSTRAINT [FK_RolePermissions_Roles] FOREIGN KEY ([RoleId]) REFERENCES [security].[Roles] ([Id])
GO
PRINT N'Adding foreign keys to [security].[UserRoles]'
GO
ALTER TABLE [security].[UserRoles] ADD CONSTRAINT [FK_UserRoles_Roles] FOREIGN KEY ([RoleId]) REFERENCES [security].[Roles] ([Id])
GO
ALTER TABLE [security].[UserRoles] ADD CONSTRAINT [FK_UserRoles_Users] FOREIGN KEY ([UserId]) REFERENCES [security].[Users] ([Id])
GO
PRINT N'Adding foreign keys to [security].[Users]'
GO
ALTER TABLE [security].[Users] ADD CONSTRAINT [FK_Users_Sites] FOREIGN KEY ([DefaultSiteId]) REFERENCES [security].[Sites] ([Id])
GO
PRINT N'Adding foreign keys to [swi].[SWIMasters]'
GO
ALTER TABLE [swi].[SWIMasters] ADD CONSTRAINT [FK_SWIMasters_SWITypes] FOREIGN KEY ([SWIType]) REFERENCES [swi].[SWITypes] ([Id])
GO
