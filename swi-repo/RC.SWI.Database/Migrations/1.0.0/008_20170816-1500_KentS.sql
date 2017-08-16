-- <Migration ID="419d4acd-13d5-4803-9294-47a5ade5f10a" />
GO

PRINT N'Dropping foreign keys from [dbo].[ApprovalActions]'
GO
ALTER TABLE [dbo].[ApprovalActions] DROP CONSTRAINT [FK_ApprovalActions_ApprovalActions_Permission]
GO
PRINT N'Dropping foreign keys from [dbo].[ApprovalGroupUsers]'
GO
ALTER TABLE [dbo].[ApprovalGroupUsers] DROP CONSTRAINT [FK_ApprovalGroupUsers_ApprovalGroup_Users]
GO
ALTER TABLE [dbo].[ApprovalGroupUsers] DROP CONSTRAINT [FK_ApprovalGroupUsers_Users]
GO
PRINT N'Dropping foreign keys from [dbo].[ApprovalRequests]'
GO
ALTER TABLE [dbo].[ApprovalRequests] DROP CONSTRAINT [FK_ApprovalRequests_ApprovalGroup_ApprovalRequests]
GO
ALTER TABLE [dbo].[ApprovalRequests] DROP CONSTRAINT [FK_ApprovalRequests_ApprovalStatus]
GO
ALTER TABLE [dbo].[ApprovalRequests] DROP CONSTRAINT [FK_ApprovalRequests_ApprovalWorkflows]
GO
ALTER TABLE [dbo].[ApprovalRequests] DROP CONSTRAINT [FK_ApprovalRequests_Documents]
GO
ALTER TABLE [dbo].[ApprovalRequests] DROP CONSTRAINT [FK_ApprovalRequests_Users]
GO
ALTER TABLE [dbo].[ApprovalRequests] DROP CONSTRAINT [FK_ApprovalRequests_Users1]
GO
PRINT N'Dropping foreign keys from [dbo].[ApprovalChanges]'
GO
ALTER TABLE [dbo].[ApprovalChanges] DROP CONSTRAINT [FK_ApprovalChanges_ApprovalRequest_ApprovalChanges]
GO
PRINT N'Dropping foreign keys from [dbo].[DocumentChanges]'
GO
ALTER TABLE [dbo].[DocumentChanges] DROP CONSTRAINT [FK_DocumentChanges_Documents]
GO
ALTER TABLE [dbo].[DocumentChanges] DROP CONSTRAINT [FK_DocumentChanges_Users]
GO
PRINT N'Dropping foreign keys from [dbo].[Documents]'
GO
ALTER TABLE [dbo].[Documents] DROP CONSTRAINT [FK_Docs_Files]
GO
ALTER TABLE [dbo].[Documents] DROP CONSTRAINT [FK_Documents_CheckedOutBy_CheckedOutDocuments]
GO
ALTER TABLE [dbo].[Documents] DROP CONSTRAINT [FK_Documents_CreatedBy_CreatedDocuments]
GO
ALTER TABLE [dbo].[Documents] DROP CONSTRAINT [FK_Documents_DocumentTypes]
GO
PRINT N'Dropping foreign keys from [dbo].[DocumentLinks]'
GO
ALTER TABLE [dbo].[DocumentLinks] DROP CONSTRAINT [FK_DocumentLinks_Documents]
GO
ALTER TABLE [dbo].[DocumentLinks] DROP CONSTRAINT [FK_DocumentLinks_Documents1]
GO
PRINT N'Dropping foreign keys from [dbo].[DocumentPartLinks]'
GO
ALTER TABLE [dbo].[DocumentPartLinks] DROP CONSTRAINT [FK_PartLinks_Docs]
GO
PRINT N'Dropping foreign keys from [swi].[SWIRevisions]'
GO
ALTER TABLE [swi].[SWIRevisions] DROP CONSTRAINT [FK_SWIRevisions_Documents]
GO
ALTER TABLE [swi].[SWIRevisions] DROP CONSTRAINT [FK_SWIRevisions_SWIMasters]
GO
PRINT N'Dropping foreign keys from [security].[AuthTokens]'
GO
ALTER TABLE [security].[AuthTokens] DROP CONSTRAINT [FK_AuthTokens_Users]
GO
PRINT N'Dropping foreign keys from [security].[RolePermissions]'
GO
ALTER TABLE [security].[RolePermissions] DROP CONSTRAINT [FK_RolePermissions_Permissions]
GO
ALTER TABLE [security].[RolePermissions] DROP CONSTRAINT [FK_RolePermissions_Roles]
GO
PRINT N'Dropping foreign keys from [security].[UserRoles]'
GO
ALTER TABLE [security].[UserRoles] DROP CONSTRAINT [FK_UserRoles_Roles]
GO
ALTER TABLE [security].[UserRoles] DROP CONSTRAINT [FK_UserRoles_Users]
GO
PRINT N'Dropping foreign keys from [swi].[SWIMasters]'
GO
ALTER TABLE [swi].[SWIMasters] DROP CONSTRAINT [FK_SWIMasters_CreatedBy_SWIMastersCreated]
GO
ALTER TABLE [swi].[SWIMasters] DROP CONSTRAINT [FK_SWIMasters_SWITypes]
GO
PRINT N'Dropping foreign keys from [swi].[SWIMasterSitePermissions]'
GO
ALTER TABLE [swi].[SWIMasterSitePermissions] DROP CONSTRAINT [FK_SWIMasterSitePermissions_GrantedBy_SWIMasterSitePermissions]
GO
ALTER TABLE [swi].[SWIMasterSitePermissions] DROP CONSTRAINT [FK_SWIMasterSitePermissions_Sites]
GO
ALTER TABLE [swi].[SWIMasterSitePermissions] DROP CONSTRAINT [FK_SWIMasterSitePermissions_SWIMasters]
GO
PRINT N'Dropping foreign keys from [security].[Users]'
GO
ALTER TABLE [security].[Users] DROP CONSTRAINT [FK_Users_Sites]
GO
PRINT N'Dropping foreign keys from [swi].[StandardTools]'
GO
ALTER TABLE [swi].[StandardTools] DROP CONSTRAINT [FK_StandardTools_SWIMasters]
GO
PRINT N'Dropping constraints from [dbo].[ApprovalGroupUsers]'
GO
ALTER TABLE [dbo].[ApprovalGroupUsers] DROP CONSTRAINT [PK_ApprovalGroupUsers]
GO
PRINT N'Dropping constraints from [dbo].[ApprovalRequests]'
GO
ALTER TABLE [dbo].[ApprovalRequests] DROP CONSTRAINT [PK_ApprovalRequests]
GO
PRINT N'Dropping constraints from [dbo].[DocumentChanges]'
GO
ALTER TABLE [dbo].[DocumentChanges] DROP CONSTRAINT [PK_DocumentChanges]
GO
PRINT N'Dropping constraints from [dbo].[Documents]'
GO
ALTER TABLE [dbo].[Documents] DROP CONSTRAINT [PK_Documents]
GO
PRINT N'Dropping constraints from [security].[AuthTokens]'
GO
ALTER TABLE [security].[AuthTokens] DROP CONSTRAINT [PK_AuthTokens]
GO
PRINT N'Dropping constraints from [security].[Permissions]'
GO
ALTER TABLE [security].[Permissions] DROP CONSTRAINT [PK_Permissions]
GO
PRINT N'Dropping constraints from [security].[RolePermissions]'
GO
ALTER TABLE [security].[RolePermissions] DROP CONSTRAINT [PK_RolePermissions]
GO
PRINT N'Dropping constraints from [security].[Roles]'
GO
ALTER TABLE [security].[Roles] DROP CONSTRAINT [PK_Roles]
GO
PRINT N'Dropping constraints from [security].[UserRoles]'
GO
ALTER TABLE [security].[UserRoles] DROP CONSTRAINT [PK_UserRoles]
GO
PRINT N'Dropping constraints from [security].[Users]'
GO
ALTER TABLE [security].[Users] DROP CONSTRAINT [PK_Users]
GO
PRINT N'Dropping constraints from [swi].[SWIMasterSitePermissions]'
GO
ALTER TABLE [swi].[SWIMasterSitePermissions] DROP CONSTRAINT [PK_SWIMasterSitePermissions]
GO
PRINT N'Dropping constraints from [swi].[SWIMasters]'
GO
ALTER TABLE [swi].[SWIMasters] DROP CONSTRAINT [PK_SWIMasters]
GO
PRINT N'Dropping [security].[UserRoles]'
GO
DROP TABLE [security].[UserRoles]
GO
PRINT N'Dropping [security].[Roles]'
GO
DROP TABLE [security].[Roles]
GO
PRINT N'Dropping [security].[RolePermissions]'
GO
DROP TABLE [security].[RolePermissions]
GO
PRINT N'Dropping [security].[AuthTokens]'
GO
DROP TABLE [security].[AuthTokens]
GO
PRINT N'Dropping [security].[Users]'
GO
DROP TABLE [security].[Users]
GO
PRINT N'Dropping [security].[Permissions]'
GO
DROP TABLE [security].[Permissions]
GO
PRINT N'Altering [security].[Sites]'
GO
ALTER TABLE [security].[Sites] ADD
[AppSecurityCompanyId] [int] NULL
GO
PRINT N'Altering [dbo].[ApprovalChanges]'
GO
ALTER TABLE [dbo].[ApprovalChanges] ALTER COLUMN [ChangedBy] [varchar] (100) NOT NULL
GO
PRINT N'Rebuilding [dbo].[ApprovalRequests]'
GO
CREATE TABLE [dbo].[RG_Recovery_1_ApprovalRequests]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[DocumentId] [int] NOT NULL,
[RequestedBy] [varchar] (100) NOT NULL,
[RequestedOn] [datetime2] NOT NULL,
[ApprovalStatusId] [int] NOT NULL,
[AssignedApprover] [varchar] (100) NULL,
[ApprovalGroupId] [int] NOT NULL,
[ApprovalWorkflowId] [int] NULL
)
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_1_ApprovalRequests] ON
GO
INSERT INTO [dbo].[RG_Recovery_1_ApprovalRequests]([Id], [DocumentId], [RequestedOn], [ApprovalStatusId], [AssignedApprover], [ApprovalGroupId], [ApprovalWorkflowId]) SELECT [Id], [DocumentId], [RequestedOn], [ApprovalStatusId], [AssignedApprover], [ApprovalGroupId], [ApprovalWorkflowId] FROM [dbo].[ApprovalRequests]
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_1_ApprovalRequests] OFF
GO
DECLARE @idVal BIGINT
SELECT @idVal = IDENT_CURRENT(N'[dbo].[ApprovalRequests]')
IF @idVal IS NOT NULL
    DBCC CHECKIDENT(N'[dbo].[RG_Recovery_1_ApprovalRequests]', RESEED, @idVal)
GO
DROP TABLE [dbo].[ApprovalRequests]
GO
EXEC sp_rename N'[dbo].[RG_Recovery_1_ApprovalRequests]', N'ApprovalRequests', N'OBJECT'
GO
PRINT N'Creating primary key [PK_ApprovalRequests] on [dbo].[ApprovalRequests]'
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [PK_ApprovalRequests] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Rebuilding [dbo].[ApprovalGroupUsers]'
GO
CREATE TABLE [dbo].[RG_Recovery_2_ApprovalGroupUsers]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[ApprovalGroupId] [int] NOT NULL,
[Username] [varchar] (100) NOT NULL
)
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_2_ApprovalGroupUsers] ON
GO
INSERT INTO [dbo].[RG_Recovery_2_ApprovalGroupUsers]([Id], [ApprovalGroupId]) SELECT [Id], [ApprovalGroupId] FROM [dbo].[ApprovalGroupUsers]
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_2_ApprovalGroupUsers] OFF
GO
DECLARE @idVal BIGINT
SELECT @idVal = IDENT_CURRENT(N'[dbo].[ApprovalGroupUsers]')
IF @idVal IS NOT NULL
    DBCC CHECKIDENT(N'[dbo].[RG_Recovery_2_ApprovalGroupUsers]', RESEED, @idVal)
GO
DROP TABLE [dbo].[ApprovalGroupUsers]
GO
EXEC sp_rename N'[dbo].[RG_Recovery_2_ApprovalGroupUsers]', N'ApprovalGroupUsers', N'OBJECT'
GO
PRINT N'Creating primary key [PK_ApprovalGroupUsers] on [dbo].[ApprovalGroupUsers]'
GO
ALTER TABLE [dbo].[ApprovalGroupUsers] ADD CONSTRAINT [PK_ApprovalGroupUsers] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Rebuilding [dbo].[Documents]'
GO
CREATE TABLE [dbo].[RG_Recovery_3_Documents]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[DocumentTypeId] [int] NOT NULL,
[Name] [nvarchar] (255) NOT NULL,
[CreatedOn] [datetime2] NOT NULL,
[CreatedBy] [varchar] (100) NOT NULL,
[AppVersion] [varchar] (10) NULL,
[CheckedOut] [bit] NOT NULL,
[CheckedOutBy] [varchar] (100) NULL,
[CheckedOutOn] [datetime2] NULL,
[DocumentFileId] [int] NULL
)
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_3_Documents] ON
GO
INSERT INTO [dbo].[RG_Recovery_3_Documents]([Id], [DocumentTypeId], [Name], [CreatedOn], [AppVersion], [CheckedOut], [CheckedOutOn], [DocumentFileId]) SELECT [Id], [DocumentTypeId], [Name], [CreatedOn], [AppVersion], [CheckedOut], [CheckedOutOn], [DocumentFileId] FROM [dbo].[Documents]
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_3_Documents] OFF
GO
DECLARE @idVal BIGINT
SELECT @idVal = IDENT_CURRENT(N'[dbo].[Documents]')
IF @idVal IS NOT NULL
    DBCC CHECKIDENT(N'[dbo].[RG_Recovery_3_Documents]', RESEED, @idVal)
GO
DROP TABLE [dbo].[Documents]
GO
EXEC sp_rename N'[dbo].[RG_Recovery_3_Documents]', N'Documents', N'OBJECT'
GO
PRINT N'Creating primary key [PK_Documents] on [dbo].[Documents]'
GO
ALTER TABLE [dbo].[Documents] ADD CONSTRAINT [PK_Documents] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Rebuilding [dbo].[DocumentChanges]'
GO
CREATE TABLE [dbo].[RG_Recovery_4_DocumentChanges]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[DocumentId] [int] NOT NULL,
[ChangedOn] [datetime2] NOT NULL,
[ChangedBy] [varchar] (100) NOT NULL,
[ChangeNotes] [varchar] (255) NULL
)
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_4_DocumentChanges] ON
GO
INSERT INTO [dbo].[RG_Recovery_4_DocumentChanges]([Id], [DocumentId], [ChangedOn], [ChangeNotes]) SELECT [Id], [DocumentId], [ChangedOn], [ChangeNotes] FROM [dbo].[DocumentChanges]
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_4_DocumentChanges] OFF
GO
DECLARE @idVal BIGINT
SELECT @idVal = IDENT_CURRENT(N'[dbo].[DocumentChanges]')
IF @idVal IS NOT NULL
    DBCC CHECKIDENT(N'[dbo].[RG_Recovery_4_DocumentChanges]', RESEED, @idVal)
GO
DROP TABLE [dbo].[DocumentChanges]
GO
EXEC sp_rename N'[dbo].[RG_Recovery_4_DocumentChanges]', N'DocumentChanges', N'OBJECT'
GO
PRINT N'Creating primary key [PK_DocumentChanges] on [dbo].[DocumentChanges]'
GO
ALTER TABLE [dbo].[DocumentChanges] ADD CONSTRAINT [PK_DocumentChanges] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Rebuilding [swi].[SWIMasters]'
GO
CREATE TABLE [swi].[RG_Recovery_5_SWIMasters]
(
[Id] [uniqueidentifier] NOT NULL,
[Title] [varchar] (255) NOT NULL,
[SWINumber] [int] NOT NULL IDENTITY(1, 1),
[IsPublic] [bit] NOT NULL,
[CreatedBy] [varchar] (100) NOT NULL,
[CreatedOn] [datetime2] NOT NULL,
[SWITypeId] [int] NOT NULL
)
GO
SET IDENTITY_INSERT [swi].[RG_Recovery_5_SWIMasters] ON
GO
INSERT INTO [swi].[RG_Recovery_5_SWIMasters]([Id], [Title], [SWINumber], [IsPublic], [CreatedOn], [SWITypeId]) SELECT [Id], [Title], [SWINumber], [IsPublic], [CreatedOn], [SWITypeId] FROM [swi].[SWIMasters]
GO
SET IDENTITY_INSERT [swi].[RG_Recovery_5_SWIMasters] OFF
GO
DECLARE @idVal BIGINT
SELECT @idVal = IDENT_CURRENT(N'[swi].[SWIMasters]')
IF @idVal IS NOT NULL
    DBCC CHECKIDENT(N'[swi].[RG_Recovery_5_SWIMasters]', RESEED, @idVal)
GO
DROP TABLE [swi].[SWIMasters]
GO
EXEC sp_rename N'[swi].[RG_Recovery_5_SWIMasters]', N'SWIMasters', N'OBJECT'
GO
PRINT N'Creating primary key [PK_SWIMasters] on [swi].[SWIMasters]'
GO
ALTER TABLE [swi].[SWIMasters] ADD CONSTRAINT [PK_SWIMasters] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Rebuilding [swi].[SWIMasterSitePermissions]'
GO
CREATE TABLE [swi].[RG_Recovery_6_SWIMasterSitePermissions]
(
[Id] [uniqueidentifier] NOT NULL,
[SWIMasterId] [uniqueidentifier] NOT NULL,
[SiteId] [int] NOT NULL,
[GrantedBy] [varchar] (100) NOT NULL,
[GrantedOn] [datetime2] NOT NULL,
[IsOwner] [bit] NOT NULL,
[Notes] [varchar] (255) NULL,
[CanRead] [bit] NOT NULL,
[CanAuthor] [bit] NOT NULL,
[CanManage] [bit] NOT NULL
)
GO
INSERT INTO [swi].[RG_Recovery_6_SWIMasterSitePermissions]([Id], [SWIMasterId], [SiteId], [GrantedOn], [IsOwner], [Notes], [CanRead], [CanAuthor], [CanManage]) SELECT [Id], [SWIMasterId], [SiteId], [GrantedOn], [IsOwner], [Notes], [CanRead], [CanAuthor], [CanManage] FROM [swi].[SWIMasterSitePermissions]
GO
DROP TABLE [swi].[SWIMasterSitePermissions]
GO
EXEC sp_rename N'[swi].[RG_Recovery_6_SWIMasterSitePermissions]', N'SWIMasterSitePermissions', N'OBJECT'
GO
PRINT N'Creating primary key [PK_SWIMasterSitePermissions] on [swi].[SWIMasterSitePermissions]'
GO
ALTER TABLE [swi].[SWIMasterSitePermissions] ADD CONSTRAINT [PK_SWIMasterSitePermissions] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[ApprovalGroupUsers]'
GO
ALTER TABLE [dbo].[ApprovalGroupUsers] ADD CONSTRAINT [FK_ApprovalGroupUsers_ApprovalGroup_Users] FOREIGN KEY ([ApprovalGroupId]) REFERENCES [dbo].[ApprovalGroups] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[ApprovalRequests]'
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [FK_ApprovalRequests_ApprovalGroup_ApprovalRequests] FOREIGN KEY ([ApprovalGroupId]) REFERENCES [dbo].[ApprovalGroups] ([Id])
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [FK_ApprovalRequests_ApprovalStatus] FOREIGN KEY ([ApprovalStatusId]) REFERENCES [dbo].[ApprovalStatus] ([Id])
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [FK_ApprovalRequests_ApprovalWorkflows] FOREIGN KEY ([ApprovalWorkflowId]) REFERENCES [dbo].[ApprovalWorkflows] ([Id])
GO
ALTER TABLE [dbo].[ApprovalRequests] ADD CONSTRAINT [FK_ApprovalRequests_Documents] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Documents] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[ApprovalChanges]'
GO
ALTER TABLE [dbo].[ApprovalChanges] ADD CONSTRAINT [FK_ApprovalChanges_ApprovalRequest_ApprovalChanges] FOREIGN KEY ([ApprovalRequestId]) REFERENCES [dbo].[ApprovalRequests] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[DocumentChanges]'
GO
ALTER TABLE [dbo].[DocumentChanges] ADD CONSTRAINT [FK_DocumentChanges_Documents] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Documents] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[Documents]'
GO
ALTER TABLE [dbo].[Documents] ADD CONSTRAINT [FK_Docs_Files] FOREIGN KEY ([DocumentFileId]) REFERENCES [dbo].[DocumentFiles] ([Id])
GO
ALTER TABLE [dbo].[Documents] ADD CONSTRAINT [FK_Documents_DocumentTypes] FOREIGN KEY ([DocumentTypeId]) REFERENCES [dbo].[DocumentTypes] ([Id])
GO
PRINT N'Adding foreign keys to [swi].[SWIMasterSitePermissions]'
GO
ALTER TABLE [swi].[SWIMasterSitePermissions] ADD CONSTRAINT [FK_SWIMasterSitePermissions_Sites] FOREIGN KEY ([SiteId]) REFERENCES [security].[Sites] ([Id])
GO
ALTER TABLE [swi].[SWIMasterSitePermissions] ADD CONSTRAINT [FK_SWIMasterSitePermissions_SWIMasters] FOREIGN KEY ([SWIMasterId]) REFERENCES [swi].[SWIMasters] ([Id])
GO
PRINT N'Adding foreign keys to [swi].[SWIMasters]'
GO
ALTER TABLE [swi].[SWIMasters] ADD CONSTRAINT [FK_SWIMasters_SWITypes] FOREIGN KEY ([SWITypeId]) REFERENCES [swi].[SWITypes] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[DocumentLinks]'
GO
ALTER TABLE [dbo].[DocumentLinks] ADD CONSTRAINT [FK_DocumentLinks_Documents] FOREIGN KEY ([DocumentAd]) REFERENCES [dbo].[Documents] ([Id])
GO
ALTER TABLE [dbo].[DocumentLinks] ADD CONSTRAINT [FK_DocumentLinks_Documents1] FOREIGN KEY ([DocumentBId]) REFERENCES [dbo].[Documents] ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[DocumentPartLinks]'
GO
ALTER TABLE [dbo].[DocumentPartLinks] ADD CONSTRAINT [FK_PartLinks_Docs] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Documents] ([Id])
GO
PRINT N'Adding foreign keys to [swi].[SWIRevisions]'
GO
ALTER TABLE [swi].[SWIRevisions] ADD CONSTRAINT [FK_SWIRevisions_Documents] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Documents] ([Id])
GO
ALTER TABLE [swi].[SWIRevisions] ADD CONSTRAINT [FK_SWIRevisions_SWIMasters] FOREIGN KEY ([MasterId]) REFERENCES [swi].[SWIMasters] ([Id])
GO
PRINT N'Adding foreign keys to [swi].[StandardTools]'
GO
ALTER TABLE [swi].[StandardTools] ADD CONSTRAINT [FK_StandardTools_SWIMasters] FOREIGN KEY ([SWIMasterId]) REFERENCES [swi].[SWIMasters] ([Id])
GO
