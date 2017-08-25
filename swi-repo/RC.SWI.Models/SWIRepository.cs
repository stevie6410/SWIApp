// <auto-generated>
// ReSharper disable ConvertPropertyToExpressionBody
// ReSharper disable DoNotCallOverridableMethodsInConstructor
// ReSharper disable InconsistentNaming
// ReSharper disable PartialMethodWithSinglePart
// ReSharper disable PartialTypeWithSinglePart
// ReSharper disable RedundantNameQualifier
// ReSharper disable RedundantOverridenMember
// ReSharper disable UseNameofExpression
// TargetFrameworkVersion = 4.5
#pragma warning disable 1591    //  Ignore "Missing XML Comment" warning


namespace RC.SWI.Entities
{


    public partial class SWIRepository : System.Data.Entity.DbContext, ISWIRepository
    {
        public System.Data.Entity.DbSet<__MigrationLog> __MigrationLogs { get; set; } // __MigrationLog
        public System.Data.Entity.DbSet<__MigrationLogCurrent> __MigrationLogCurrents { get; set; } // __MigrationLogCurrent
        public System.Data.Entity.DbSet<AppConfiguration> AppConfigurations { get; set; } // AppConfigurations
        public System.Data.Entity.DbSet<ApprovalAction> ApprovalActions { get; set; } // ApprovalActions
        public System.Data.Entity.DbSet<ApprovalChanx> ApprovalChanges { get; set; } // ApprovalChanges
        public System.Data.Entity.DbSet<ApprovalGroup> ApprovalGroups { get; set; } // ApprovalGroups
        public System.Data.Entity.DbSet<ApprovalGroupUser> ApprovalGroupUsers { get; set; } // ApprovalGroupUsers
        public System.Data.Entity.DbSet<ApprovalRequest> ApprovalRequests { get; set; } // ApprovalRequests
        public System.Data.Entity.DbSet<ApprovalStatu> ApprovalStatus { get; set; } // ApprovalStatus
        public System.Data.Entity.DbSet<ApprovalWorkflow> ApprovalWorkflows { get; set; } // ApprovalWorkflows
        public System.Data.Entity.DbSet<AppSetting> AppSettings { get; set; } // AppSettings
        public System.Data.Entity.DbSet<Document> Documents { get; set; } // Documents
        public System.Data.Entity.DbSet<DocumentChanx> DocumentChanges { get; set; } // DocumentChanges
        public System.Data.Entity.DbSet<DocumentFile> DocumentFiles { get; set; } // DocumentFiles
        public System.Data.Entity.DbSet<DocumentLink> DocumentLinks { get; set; } // DocumentLinks
        public System.Data.Entity.DbSet<DocumentPartLink> DocumentPartLinks { get; set; } // DocumentPartLinks
        public System.Data.Entity.DbSet<DocumentType> DocumentTypes { get; set; } // DocumentTypes
        public System.Data.Entity.DbSet<DocumentWatcher> DocumentWatchers { get; set; } // DocumentWatchers
        public System.Data.Entity.DbSet<ErpSystem> ErpSystems { get; set; } // ErpSystem
        public System.Data.Entity.DbSet<HealthAndSafetyIcon> HealthAndSafetyIcons { get; set; } // HealthAndSafetyIcon
        public System.Data.Entity.DbSet<Notification> Notifications { get; set; } // Notifications
        public System.Data.Entity.DbSet<Site> Sites { get; set; } // Sites
        public System.Data.Entity.DbSet<StandardTool> StandardTools { get; set; } // StandardTools
        public System.Data.Entity.DbSet<SWIMaster> SWIMasters { get; set; } // SWIMasters
        public System.Data.Entity.DbSet<SWIMasterSitePermission> SWIMasterSitePermissions { get; set; } // SWIMasterSitePermissions
        public System.Data.Entity.DbSet<SWIRevision> SWIRevisions { get; set; } // SWIRevisions
        public System.Data.Entity.DbSet<SWIType> SWITypes { get; set; } // SWITypes

        static SWIRepository()
        {
            System.Data.Entity.Database.SetInitializer<SWIRepository>(null);
        }

        public SWIRepository()
            : base("Name=SWIRepository")
        {
            InitializePartial();
        }

        public SWIRepository(string connectionString)
            : base(connectionString)
        {
            InitializePartial();
        }

        public SWIRepository(string connectionString, System.Data.Entity.Infrastructure.DbCompiledModel model)
            : base(connectionString, model)
        {
            InitializePartial();
        }

        public SWIRepository(System.Data.Common.DbConnection existingConnection, bool contextOwnsConnection)
            : base(existingConnection, contextOwnsConnection)
        {
            InitializePartial();
        }

        public SWIRepository(System.Data.Common.DbConnection existingConnection, System.Data.Entity.Infrastructure.DbCompiledModel model, bool contextOwnsConnection)
            : base(existingConnection, model, contextOwnsConnection)
        {
            InitializePartial();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

        public bool IsSqlParameterNull(System.Data.SqlClient.SqlParameter param)
        {
            var sqlValue = param.SqlValue;
            var nullableValue = sqlValue as System.Data.SqlTypes.INullable;
            if (nullableValue != null)
                return nullableValue.IsNull;
            return (sqlValue == null || sqlValue == System.DBNull.Value);
        }

        protected override void OnModelCreating(System.Data.Entity.DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new __MigrationLogConfiguration());
            modelBuilder.Configurations.Add(new __MigrationLogCurrentConfiguration());
            modelBuilder.Configurations.Add(new AppConfigurationConfiguration());
            modelBuilder.Configurations.Add(new ApprovalActionConfiguration());
            modelBuilder.Configurations.Add(new ApprovalChanxConfiguration());
            modelBuilder.Configurations.Add(new ApprovalGroupConfiguration());
            modelBuilder.Configurations.Add(new ApprovalGroupUserConfiguration());
            modelBuilder.Configurations.Add(new ApprovalRequestConfiguration());
            modelBuilder.Configurations.Add(new ApprovalStatuConfiguration());
            modelBuilder.Configurations.Add(new ApprovalWorkflowConfiguration());
            modelBuilder.Configurations.Add(new AppSettingConfiguration());
            modelBuilder.Configurations.Add(new DocumentConfiguration());
            modelBuilder.Configurations.Add(new DocumentChanxConfiguration());
            modelBuilder.Configurations.Add(new DocumentFileConfiguration());
            modelBuilder.Configurations.Add(new DocumentLinkConfiguration());
            modelBuilder.Configurations.Add(new DocumentPartLinkConfiguration());
            modelBuilder.Configurations.Add(new DocumentTypeConfiguration());
            modelBuilder.Configurations.Add(new DocumentWatcherConfiguration());
            modelBuilder.Configurations.Add(new ErpSystemConfiguration());
            modelBuilder.Configurations.Add(new HealthAndSafetyIconConfiguration());
            modelBuilder.Configurations.Add(new NotificationConfiguration());
            modelBuilder.Configurations.Add(new SiteConfiguration());
            modelBuilder.Configurations.Add(new StandardToolConfiguration());
            modelBuilder.Configurations.Add(new SWIMasterConfiguration());
            modelBuilder.Configurations.Add(new SWIMasterSitePermissionConfiguration());
            modelBuilder.Configurations.Add(new SWIRevisionConfiguration());
            modelBuilder.Configurations.Add(new SWITypeConfiguration());

            OnModelCreatingPartial(modelBuilder);
        }

        public static System.Data.Entity.DbModelBuilder CreateModel(System.Data.Entity.DbModelBuilder modelBuilder, string schema)
        {
            modelBuilder.Configurations.Add(new __MigrationLogConfiguration(schema));
            modelBuilder.Configurations.Add(new __MigrationLogCurrentConfiguration(schema));
            modelBuilder.Configurations.Add(new AppConfigurationConfiguration(schema));
            modelBuilder.Configurations.Add(new ApprovalActionConfiguration(schema));
            modelBuilder.Configurations.Add(new ApprovalChanxConfiguration(schema));
            modelBuilder.Configurations.Add(new ApprovalGroupConfiguration(schema));
            modelBuilder.Configurations.Add(new ApprovalGroupUserConfiguration(schema));
            modelBuilder.Configurations.Add(new ApprovalRequestConfiguration(schema));
            modelBuilder.Configurations.Add(new ApprovalStatuConfiguration(schema));
            modelBuilder.Configurations.Add(new ApprovalWorkflowConfiguration(schema));
            modelBuilder.Configurations.Add(new AppSettingConfiguration(schema));
            modelBuilder.Configurations.Add(new DocumentConfiguration(schema));
            modelBuilder.Configurations.Add(new DocumentChanxConfiguration(schema));
            modelBuilder.Configurations.Add(new DocumentFileConfiguration(schema));
            modelBuilder.Configurations.Add(new DocumentLinkConfiguration(schema));
            modelBuilder.Configurations.Add(new DocumentPartLinkConfiguration(schema));
            modelBuilder.Configurations.Add(new DocumentTypeConfiguration(schema));
            modelBuilder.Configurations.Add(new DocumentWatcherConfiguration(schema));
            modelBuilder.Configurations.Add(new ErpSystemConfiguration(schema));
            modelBuilder.Configurations.Add(new HealthAndSafetyIconConfiguration(schema));
            modelBuilder.Configurations.Add(new NotificationConfiguration(schema));
            modelBuilder.Configurations.Add(new SiteConfiguration(schema));
            modelBuilder.Configurations.Add(new StandardToolConfiguration(schema));
            modelBuilder.Configurations.Add(new SWIMasterConfiguration(schema));
            modelBuilder.Configurations.Add(new SWIMasterSitePermissionConfiguration(schema));
            modelBuilder.Configurations.Add(new SWIRevisionConfiguration(schema));
            modelBuilder.Configurations.Add(new SWITypeConfiguration(schema));
            return modelBuilder;
        }

        partial void InitializePartial();
        partial void OnModelCreatingPartial(System.Data.Entity.DbModelBuilder modelBuilder);
    }
}
// </auto-generated>
