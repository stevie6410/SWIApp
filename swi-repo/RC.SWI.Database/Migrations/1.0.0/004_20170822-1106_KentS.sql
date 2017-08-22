-- <Migration ID="1b13d65b-2092-438f-83fb-a2f77ab46e4f" />
GO

PRINT N'Altering [dbo].[DocumentChanges]'
GO
ALTER TABLE [dbo].[DocumentChanges] ADD
[ChangeOperation] [varchar] (255) NULL
GO
