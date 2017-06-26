-- <Migration ID="71521908-ba4a-43bf-9fb1-c3423717bb9a" />
GO
PRINT N'Altering [swi].[StandardTools]'
GO
ALTER TABLE [swi].[StandardTools] ALTER COLUMN [Image] [varchar] (max) NULL
GO
ALTER TABLE [swi].[StandardTools] ALTER COLUMN [HasCarePoint] [bit] NULL
GO
