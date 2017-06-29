-- <Migration ID="2fab9070-b408-44b2-98aa-d438eebc80ad" />
GO

SET DATEFORMAT YMD;


GO
PRINT (N'Update 10 rows in [dbo].[HealthAndSafetyIcon]');

UPDATE [dbo].[HealthAndSafetyIcon]
SET    [Caption] = N'Eye protection must be worn'
WHERE  [Id] = 1;

UPDATE [dbo].[HealthAndSafetyIcon]
SET    [Caption] = N'Safety helmet must be worn'
WHERE  [Id] = 4;

UPDATE [dbo].[HealthAndSafetyIcon]
SET    [Caption] = N'Ear protection must be worn'
WHERE  [Id] = 6;

UPDATE [dbo].[HealthAndSafetyIcon]
SET    [Caption] = N'Respiratory equipment must be worn'
WHERE  [Id] = 7;

UPDATE [dbo].[HealthAndSafetyIcon]
SET    [Caption] = N'Safety boots must be worn'
WHERE  [Id] = 8;

UPDATE [dbo].[HealthAndSafetyIcon]
SET    [Caption] = N'Safety gloves must be worn'
WHERE  [Id] = 9;

UPDATE [dbo].[HealthAndSafetyIcon]
SET    [Caption] = N'Safety harness must be worn'
WHERE  [Id] = 10;

UPDATE [dbo].[HealthAndSafetyIcon]
SET    [Caption] = N'Face protection must be worn'
WHERE  [Id] = 11;

UPDATE [dbo].[HealthAndSafetyIcon]
SET    [Caption] = N'Safety overalls must be worn'
WHERE  [Id] = 13;

UPDATE [dbo].[HealthAndSafetyIcon]
SET    [Caption] = N'Predestrians must use this route'
WHERE  [Id] = 14;


GO
PRINT (N'Update 1 row in [dbo].[AppConfigurations]');

UPDATE [dbo].[AppConfigurations]
SET    [Version] = 6
WHERE  [Id] = 1;


GO