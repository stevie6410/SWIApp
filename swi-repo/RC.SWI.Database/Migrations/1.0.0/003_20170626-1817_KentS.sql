-- <Migration ID="b54e6bd8-6a19-4cab-b125-c168b50ddb40" />
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
