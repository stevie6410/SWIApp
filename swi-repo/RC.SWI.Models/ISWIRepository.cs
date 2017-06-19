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

    public interface ISWIRepository : System.IDisposable
    {
        System.Data.Entity.DbSet<__MigrationLog> __MigrationLogs { get; set; } // __MigrationLog
        System.Data.Entity.DbSet<__MigrationLogCurrent> __MigrationLogCurrents { get; set; } // __MigrationLogCurrent
        System.Data.Entity.DbSet<ApprovalAction> ApprovalActions { get; set; } // ApprovalActions
        System.Data.Entity.DbSet<ApprovalChanx> ApprovalChanges { get; set; } // ApprovalChanges
        System.Data.Entity.DbSet<ApprovalGroup> ApprovalGroups { get; set; } // ApprovalGroups
        System.Data.Entity.DbSet<ApprovalGroupUser> ApprovalGroupUsers { get; set; } // ApprovalGroupUsers
        System.Data.Entity.DbSet<ApprovalRequest> ApprovalRequests { get; set; } // ApprovalRequests
        System.Data.Entity.DbSet<ApprovalStatu> ApprovalStatus { get; set; } // ApprovalStatus
        System.Data.Entity.DbSet<ApprovalWorkflow> ApprovalWorkflows { get; set; } // ApprovalWorkflows
        System.Data.Entity.DbSet<AuthToken> AuthTokens { get; set; } // AuthTokens
        System.Data.Entity.DbSet<Document> Documents { get; set; } // Documents
        System.Data.Entity.DbSet<DocumentChanx> DocumentChanges { get; set; } // DocumentChanges
        System.Data.Entity.DbSet<DocumentFile> DocumentFiles { get; set; } // DocumentFiles
        System.Data.Entity.DbSet<DocumentLink> DocumentLinks { get; set; } // DocumentLinks
        System.Data.Entity.DbSet<DocumentPartLink> DocumentPartLinks { get; set; } // DocumentPartLinks
        System.Data.Entity.DbSet<DocumentType> DocumentTypes { get; set; } // DocumentTypes
        System.Data.Entity.DbSet<ErpSystem> ErpSystems { get; set; } // ErpSystem
        System.Data.Entity.DbSet<Permission> Permissions { get; set; } // Permissions
        System.Data.Entity.DbSet<Role> Roles { get; set; } // Roles
        System.Data.Entity.DbSet<RolePermission> RolePermissions { get; set; } // RolePermissions
        System.Data.Entity.DbSet<Site> Sites { get; set; } // Sites
        System.Data.Entity.DbSet<SWIMaster> SWIMasters { get; set; } // SWIMasters
        System.Data.Entity.DbSet<SWIMasterSitePermission> SWIMasterSitePermissions { get; set; } // SWIMasterSitePermissions
        System.Data.Entity.DbSet<SWIRevision> SWIRevisions { get; set; } // SWIRevisions
        System.Data.Entity.DbSet<SWIType> SWITypes { get; set; } // SWITypes
        System.Data.Entity.DbSet<User> Users { get; set; } // Users
        System.Data.Entity.DbSet<UserRole> UserRoles { get; set; } // UserRoles

        int SaveChanges();
        System.Threading.Tasks.Task<int> SaveChangesAsync();
        System.Threading.Tasks.Task<int> SaveChangesAsync(System.Threading.CancellationToken cancellationToken);
        System.Data.Entity.Infrastructure.DbChangeTracker ChangeTracker { get; }
        System.Data.Entity.Infrastructure.DbContextConfiguration Configuration { get; }
        System.Data.Entity.Database Database { get; }
        System.Data.Entity.Infrastructure.DbEntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
        System.Data.Entity.Infrastructure.DbEntityEntry Entry(object entity);
        System.Collections.Generic.IEnumerable<System.Data.Entity.Validation.DbEntityValidationResult> GetValidationErrors();
        System.Data.Entity.DbSet Set(System.Type entityType);
        System.Data.Entity.DbSet<TEntity> Set<TEntity>() where TEntity : class;
        string ToString();
    }

}
// </auto-generated>
