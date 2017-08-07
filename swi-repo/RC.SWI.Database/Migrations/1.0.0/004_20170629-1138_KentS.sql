-- <Migration ID="b7b51710-4844-43e1-942f-dea2878a4dd6" />
GO

PRINT N'Altering [dbo].[HealthAndSafetyIcon]'
GO
ALTER TABLE [dbo].[HealthAndSafetyIcon] ADD
[Caption] [nvarchar] (255) NULL
GO
