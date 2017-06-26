-- <Migration ID="6602cec4-3815-4de7-866e-e1eb4c82af4a" />
GO

PRINT N'Dropping foreign keys from [dbo].[DocumentPartLinks]'
GO
ALTER TABLE [dbo].[DocumentPartLinks] DROP CONSTRAINT [FK_PartLinks_ErpSystem]
GO
PRINT N'Dropping constraints from [dbo].[ErpSystem]'
GO
ALTER TABLE [dbo].[ErpSystem] DROP CONSTRAINT [PK_ErpSystem]
GO
PRINT N'Rebuilding [dbo].[ErpSystem]'
GO
CREATE TABLE [dbo].[RG_Recovery_1_ErpSystem]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [varchar] (50) NOT NULL,
[Description] [varchar] (255) NULL
)
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_1_ErpSystem] ON
GO
INSERT INTO [dbo].[RG_Recovery_1_ErpSystem]([Id], [Name], [Description]) SELECT [Id], [Name], [Description] FROM [dbo].[ErpSystem]
GO
SET IDENTITY_INSERT [dbo].[RG_Recovery_1_ErpSystem] OFF
GO
DROP TABLE [dbo].[ErpSystem]
GO
EXEC sp_rename N'[dbo].[RG_Recovery_1_ErpSystem]', N'ErpSystem', N'OBJECT'
GO
PRINT N'Creating primary key [PK_ErpSystem] on [dbo].[ErpSystem]'
GO
ALTER TABLE [dbo].[ErpSystem] ADD CONSTRAINT [PK_ErpSystem] PRIMARY KEY CLUSTERED  ([Id])
GO
PRINT N'Adding foreign keys to [dbo].[DocumentPartLinks]'
GO
ALTER TABLE [dbo].[DocumentPartLinks] ADD CONSTRAINT [FK_PartLinks_ErpSystem] FOREIGN KEY ([ErpSystemId]) REFERENCES [dbo].[ErpSystem] ([Id])
GO
