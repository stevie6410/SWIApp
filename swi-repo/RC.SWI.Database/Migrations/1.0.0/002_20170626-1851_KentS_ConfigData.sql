-- <Migration ID="96d0c404-eea6-4771-ae79-cfd4a4d6ffbe" />
GO

SET DATEFORMAT YMD;


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
    FROM   [security].[Sites]) = 0
    BEGIN
        PRINT (N'Add 2 rows to [security].[Sites]');
        SET IDENTITY_INSERT [security].[Sites] ON;
        INSERT  INTO [security].[Sites] ([Id], [Name], [Description], [SiteADSecurityGroup])
        VALUES                         (1, 'LB-SAO', 'Leighton Buzzard SAO', NULL);
        INSERT  INTO [security].[Sites] ([Id], [Name], [Description], [SiteADSecurityGroup])
        VALUES                         (2, 'WS-SAO', 'Winston Salem SAO', NULL);
        SET IDENTITY_INSERT [security].[Sites] OFF;
    END


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