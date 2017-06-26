-- <Migration ID="2715a179-9454-4623-b020-c2a431fd0f58" />
GO

PRINT N'Dropping foreign keys from [dbo].[HealthAndSafetyIcon]'
GO
ALTER TABLE [dbo].[HealthAndSafetyIcon] DROP CONSTRAINT [FK_HealthAndSafetyIcon_AppConfigurations]
GO
PRINT N'Rebuilding [dbo].[HealthAndSafetyIcon]'
GO
CREATE TABLE [dbo].[RG_Recovery_1_HealthAndSafetyIcon]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [varchar] (255) NOT NULL,
[Image] [varchar] (max) NULL,
[AppConfigurationId] [int] NOT NULL
)
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_1_HealthAndSafetyIcon] ON
GO
INSERT INTO [dbo].[RG_Recovery_1_HealthAndSafetyIcon]([Id], [Name], [Image], [AppConfigurationId]) SELECT [Id], [Name], [Image], [AppConfigurationId] FROM [dbo].[HealthAndSafetyIcon]
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_1_HealthAndSafetyIcon] OFF
GO
DROP TABLE [dbo].[HealthAndSafetyIcon]
GO
EXEC sp_rename N'[dbo].[RG_Recovery_1_HealthAndSafetyIcon]', N'HealthAndSafetyIcon', N'OBJECT'
GO
PRINT N'Creating primary key [PK_HealthAndSafetyIcon] on [dbo].[HealthAndSafetyIcon]'
GO
ALTER TABLE [dbo].[HealthAndSafetyIcon] ADD CONSTRAINT [PK_HealthAndSafetyIcon] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[HealthAndSafetyIcon]'
GO
ALTER TABLE [dbo].[HealthAndSafetyIcon] ADD CONSTRAINT [FK_HealthAndSafetyIcon_AppConfigurations] FOREIGN KEY ([AppConfigurationId]) REFERENCES [dbo].[AppConfigurations] ([Id])
GO

SET IMPLICIT_TRANSACTIONS, NUMERIC_ROUNDABORT OFF;
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, NOCOUNT, QUOTED_IDENTIFIER ON;

SET DATEFORMAT YMD;


GO
IF (SELECT COUNT(*)
    FROM   [dbo].[AppConfigurations]) = 0
    BEGIN
        PRINT (N'Add 3 rows to [dbo].[AppConfigurations]');
        SET IDENTITY_INSERT [dbo].[AppConfigurations] ON;
        INSERT  INTO [dbo].[AppConfigurations] ([Id], [Name], [Version], [IssuedOn], [SiteId], [IsGlobal])
        VALUES                                (1, N'GlobalSAOConfig', 4, '2017-06-20 00:00:00.0000000', 1, 1);
        INSERT  INTO [dbo].[AppConfigurations] ([Id], [Name], [Version], [IssuedOn], [SiteId], [IsGlobal])
        VALUES                                (2, N'LBSAOConfig', 4, '2017-06-20 00:00:00.0000000', 1, 0);
        INSERT  INTO [dbo].[AppConfigurations] ([Id], [Name], [Version], [IssuedOn], [SiteId], [IsGlobal])
        VALUES                                (3, N'WSSAOConfig', 4, '2017-06-20 00:00:00.0000000', 2, 0);
        SET IDENTITY_INSERT [dbo].[AppConfigurations] OFF;
    END


GO
IF (SELECT COUNT(*)
    FROM   [dbo].[DocumentTypes]) = 0
    BEGIN
        PRINT (N'Add 2 rows to [dbo].[DocumentTypes]');
        SET IDENTITY_INSERT [dbo].[DocumentTypes] ON;
        INSERT  INTO [dbo].[DocumentTypes] ([Id], [Name], [Description], [AllowedFileExt], [IsString], [IsBinary], [IsSWI])
        VALUES                            (1, 'SWI', 'Standard Work Instruction', N'swi', 1, 0, 1);
        INSERT  INTO [dbo].[DocumentTypes] ([Id], [Name], [Description], [AllowedFileExt], [IsString], [IsBinary], [IsSWI])
        VALUES                            (2, 'Setup Sheet', 'Setup Sheet', N'pdf', 0, 1, 0);
        SET IDENTITY_INSERT [dbo].[DocumentTypes] OFF;
    END


GO
IF (SELECT COUNT(*)
    FROM   [dbo].[ErpSystem]) = 0
    BEGIN
        PRINT (N'Add 1 row to [dbo].[ErpSystem]');
        INSERT  INTO [dbo].[ErpSystem] ([Id], [Name], [Description])
        VALUES                        (1, 'E1', 'Enterprise One');
    END


GO
IF (SELECT COUNT(*)
    FROM   [dbo].[AppSettings]) = 0
    BEGIN
        PRINT (N'Add 1 row to [dbo].[AppSettings]');
        SET IDENTITY_INSERT [dbo].[AppSettings] ON;
        INSERT  INTO [dbo].[AppSettings] ([Id], [Name], [Description], [Value], [AppConfigurationId])
        VALUES                          (1, 'RepositoryURL', 'URL for Repository Web', 'https://localhost:4201', 1);
        SET IDENTITY_INSERT [dbo].[AppSettings] OFF;
    END


GO
IF (SELECT COUNT(*)
    FROM   [swi].[SWITypes]) = 0
    BEGIN
        PRINT (N'Add 1 row to [swi].[SWITypes]');
        SET IDENTITY_INSERT [swi].[SWITypes] ON;
        INSERT  INTO [swi].[SWITypes] ([Id], [Name], [Description], [AppConfigurationId])
        VALUES                       (1, 'Manufacturing', 'dhjh', NULL);
        SET IDENTITY_INSERT [swi].[SWITypes] OFF;
    END


GO