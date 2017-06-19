using RC.SWI.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.Persistance
{
    public partial class SWIRepository : DbContext
    {
        public SWIRepository()
            : base("name=SWIRepositoryModels")
        {
            base.Configuration.LazyLoadingEnabled = false;
        }

        public virtual DbSet<ApprovalAction> ApprovalActions { get; set; }
        public virtual DbSet<ApprovalChange> ApprovalChanges { get; set; }
        public virtual DbSet<ApprovalGroup> ApprovalGroups { get; set; }
        public virtual DbSet<ApprovalGroupUser> ApprovalGroupUsers { get; set; }
        public virtual DbSet<ApprovalRequest> ApprovalRequests { get; set; }
        public virtual DbSet<ApprovalStatus> ApprovalStatus { get; set; }
        public virtual DbSet<ApprovalWorkflow> ApprovalWorkflows { get; set; }
        public virtual DbSet<DocumentChange> DocumentChanges { get; set; }
        public virtual DbSet<DocumentLink> DocumentLinks { get; set; }
        public virtual DbSet<DocumentPartLink> DocumentPartLinks { get; set; }
        public virtual DbSet<Document> Documents { get; set; }
        public virtual DbSet<DocumentType> DocumentTypes { get; set; }
        public virtual DbSet<ErpSystem> ErpSystems { get; set; }
        public virtual DbSet<AuthToken> AuthTokens { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }
        public virtual DbSet<RolePermission> RolePermissions { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Site> Sites { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<SWIMaster> SWIMasters { get; set; }
        public virtual DbSet<SWIRevision> SWIRevisions { get; set; }
        public virtual DbSet<SWIType> SWITypes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApprovalAction>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<ApprovalChange>()
                .Property(e => e.ChangeNotes)
                .IsUnicode(false);

            modelBuilder.Entity<ApprovalGroup>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<ApprovalGroup>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<ApprovalGroup>()
                .HasMany(e => e.ApprovalGroupUsers)
                .WithRequired(e => e.ApprovalGroup)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ApprovalGroup>()
                .HasMany(e => e.ApprovalRequests)
                .WithRequired(e => e.ApprovalGroup)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ApprovalStatus>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<ApprovalStatus>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<ApprovalStatus>()
                .HasMany(e => e.ApprovalRequests)
                .WithRequired(e => e.ApprovalStatu)
                .HasForeignKey(e => e.ApprovalStatusId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ApprovalWorkflow>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<ApprovalWorkflow>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<DocumentChange>()
                .Property(e => e.ChangeNotes)
                .IsUnicode(false);

            modelBuilder.Entity<DocumentLink>()
                .Property(e => e.LinkNotes)
                .IsUnicode(false);

            modelBuilder.Entity<DocumentPartLink>()
                .Property(e => e.PartNumber)
                .IsUnicode(false);

            modelBuilder.Entity<DocumentPartLink>()
                .Property(e => e.Revision)
                .IsUnicode(false);

            modelBuilder.Entity<Document>()
                .Property(e => e.AppVersion)
                .IsUnicode(false);

            modelBuilder.Entity<Document>()
                .HasMany(e => e.DocumentChanges)
                .WithRequired(e => e.Document)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Document>()
                .HasMany(e => e.DocumentLinks)
                .WithRequired(e => e.Document)
                .HasForeignKey(e => e.DocumentAd)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Document>()
                .HasMany(e => e.DocumentLinks1)
                .WithRequired(e => e.Document1)
                .HasForeignKey(e => e.DocumentBId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Document>()
                .HasMany(e => e.DocumentPartLinks)
                .WithRequired(e => e.Document)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<DocumentType>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<DocumentType>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<DocumentType>()
                .HasMany(e => e.Documents)
                .WithRequired(e => e.DocumentType)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ErpSystem>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<ErpSystem>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Permission>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Permission>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Permission>()
                .HasMany(e => e.RolePermissions)
                .WithRequired(e => e.Permission)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Role>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Role>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Role>()
                .HasMany(e => e.RolePermissions)
                .WithRequired(e => e.Role)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Site>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Site>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Site>()
                .HasMany(e => e.Users)
                .WithRequired(e => e.Site)
                .HasForeignKey(e => e.DefaultSiteId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Username)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.FirstName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.LastName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.EmailAddress)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.ApprovalGroupUsers)
                .WithRequired(e => e.User)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.ApprovalRequests)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.RequestedById)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.ApprovalRequests1)
                .WithOptional(e => e.User1)
                .HasForeignKey(e => e.AssignedApprover);

            modelBuilder.Entity<User>()
                .HasMany(e => e.DocumentChanges)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.ChangedById)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Documents)
                .WithRequired(e => e.CreatedBy)
                .HasForeignKey(e => e.CreatedById)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Documents1)
                .WithRequired(e => e.ModifiedBy)
                .HasForeignKey(e => e.ModifiedById)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.AuthTokens)
                .WithRequired(e => e.User)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.UserRoles)
                .WithRequired(e => e.User)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SWIMaster>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<SWIMaster>()
                .HasMany(e => e.SWIRevisions)
                .WithRequired(e => e.SWIMaster)
                .HasForeignKey(e => e.MasterId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SWIRevision>()
                .Property(e => e.AppVersion)
                .IsUnicode(false);

            modelBuilder.Entity<SWIRevision>()
                .HasMany(e => e.ApprovalRequests)
                .WithRequired(e => e.SWIRevision)
                .HasForeignKey(e => e.RevisionId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SWIType>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<SWIType>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<SWIType>()
                .HasMany(e => e.SWIMasters)
                .WithRequired(e => e.SWIType1)
                .HasForeignKey(e => e.SWIType)
                .WillCascadeOnDelete(false);
        }

    }
}

