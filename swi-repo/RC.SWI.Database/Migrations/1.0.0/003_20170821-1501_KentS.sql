-- <Migration ID="84fb9652-5a12-4354-b75e-065280f07906" />
GO

PRINT N'Altering [swi].[SWIRevisions]'
GO
ALTER TABLE [swi].[SWIRevisions] ADD
[SwiFileId] [nvarchar] (255) NULL
GO

SET IMPLICIT_TRANSACTIONS, NUMERIC_ROUNDABORT OFF;
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, NOCOUNT, QUOTED_IDENTIFIER ON;

SET DATEFORMAT YMD;


GO
PRINT (N'Update 2 rows in [security].[Sites]');

UPDATE [security].[Sites]
SET    [AppSecurityCompanyId] = 1
WHERE  [Id] = 1;

UPDATE [security].[Sites]
SET    [AppSecurityCompanyId] = 2
WHERE  [Id] = 2;


GO