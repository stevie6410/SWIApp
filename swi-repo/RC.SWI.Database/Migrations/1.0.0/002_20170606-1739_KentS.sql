-- <Migration ID="8a4788b1-db26-4982-9635-d0b12fcf8e5a" />
GO

PRINT N'Dropping foreign keys from [dbo].[Documents]'
GO
ALTER TABLE [dbo].[Documents] DROP CONSTRAINT [FK_Documents_Users]
GO
ALTER TABLE [dbo].[Documents] DROP CONSTRAINT [FK_Documents_Users1]
GO
PRINT N'Altering [dbo].[Documents]'
GO
ALTER TABLE [dbo].[Documents] ADD
[CheckedOutById] [int] NULL
GO
ALTER TABLE [dbo].[Documents] DROP
COLUMN [CheckedOutBy]
GO
EXEC sp_rename N'[dbo].[Documents].[CreatedBy]', N'CreatedById', N'COLUMN'
GO
EXEC sp_rename N'[dbo].[Documents].[ModifiedBy]', N'ModifiedById', N'COLUMN'
GO
ALTER TABLE [dbo].[Documents] ALTER COLUMN [CheckedOutOn] [datetime2] NULL
GO
PRINT N'Adding foreign keys to [dbo].[Documents]'
GO
ALTER TABLE [dbo].[Documents] ADD CONSTRAINT [FK_Documents_Users] FOREIGN KEY ([CreatedById]) REFERENCES [security].[Users] ([Id])
GO
ALTER TABLE [dbo].[Documents] ADD CONSTRAINT [FK_Documents_Users1] FOREIGN KEY ([ModifiedById]) REFERENCES [security].[Users] ([Id])
GO
