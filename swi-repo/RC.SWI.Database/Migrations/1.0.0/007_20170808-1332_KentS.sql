-- <Migration ID="662bc3e6-7853-4fc9-8cad-ea1044531359" />
GO

SET DATEFORMAT YMD;


GO
PRINT (N'Update 1 row in [dbo].[AppConfigurations]');

UPDATE [dbo].[AppConfigurations]
SET    [Version] = 7
WHERE  [Id] = 1;


GO
PRINT (N'Add 1 row to [dbo].[AppSettings]');

SET IDENTITY_INSERT [dbo].[AppSettings] ON;

INSERT  INTO [dbo].[AppSettings] ([Id], [Name], [Description], [Value], [AppConfigurationId])
VALUES                          (2, 'LocalDocumentsWarningLimit', 'Sets the number of document which can be sotred localy before a warning is shown in the browser screen', '3', 1);

SET IDENTITY_INSERT [dbo].[AppSettings] OFF;


GO