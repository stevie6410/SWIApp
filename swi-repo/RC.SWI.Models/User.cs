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

    // Users
    public partial class User
    {
        public int Id { get; set; } // Id (Primary key)
        public string Username { get; set; } // Username (length: 50)
        public string FirstName { get; set; } // FirstName (length: 50)
        public string LastName { get; set; } // LastName (length: 50)
        public string EmailAddress { get; set; } // EmailAddress (length: 100)
        public int DefaultSiteId { get; set; } // DefaultSiteId

        // Reverse navigation

        /// <summary>
        /// Child ApprovalGroupUsers where [ApprovalGroupUsers].[UserId] point to this entity (FK_ApprovalGroupUsers_Users)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<ApprovalGroupUser> ApprovalGroupUsers { get; set; } // ApprovalGroupUsers.FK_ApprovalGroupUsers_Users
        /// <summary>
        /// Child ApprovalRequests where [ApprovalRequests].[AssignedApprover] point to this entity (FK_ApprovalRequests_Users1)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<ApprovalRequest> AssignedApprover { get; set; } // ApprovalRequests.FK_ApprovalRequests_Users1
        /// <summary>
        /// Child ApprovalRequests where [ApprovalRequests].[RequestedById] point to this entity (FK_ApprovalRequests_Users)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<ApprovalRequest> RequestedBy { get; set; } // ApprovalRequests.FK_ApprovalRequests_Users
        /// <summary>
        /// Child AuthTokens where [AuthTokens].[UserId] point to this entity (FK_AuthTokens_Users)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<AuthToken> AuthTokens { get; set; } // AuthTokens.FK_AuthTokens_Users
        /// <summary>
        /// Child Documents where [Documents].[CheckedOutById] point to this entity (FK_Documents_CheckedOutBy_CheckedOutDocuments)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<Document> CheckedOutDocuments { get; set; } // Documents.FK_Documents_CheckedOutBy_CheckedOutDocuments
        /// <summary>
        /// Child Documents where [Documents].[CreatedById] point to this entity (FK_Documents_CreatedBy_CreatedDocuments)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<Document> CreatedDocuments { get; set; } // Documents.FK_Documents_CreatedBy_CreatedDocuments
        /// <summary>
        /// Child DocumentChanges where [DocumentChanges].[ChangedById] point to this entity (FK_DocumentChanges_Users)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<DocumentChanx> DocumentChanges { get; set; } // DocumentChanges.FK_DocumentChanges_Users
        /// <summary>
        /// Child SWIMasters where [SWIMasters].[CreatedById] point to this entity (FK_SWIMasters_CreatedBy_SWIMastersCreated)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<SWIMaster> SWIMastersCreated { get; set; } // SWIMasters.FK_SWIMasters_CreatedBy_SWIMastersCreated
        /// <summary>
        /// Child SWIMasterSitePermissions where [SWIMasterSitePermissions].[GrantedById] point to this entity (FK_SWIMasterSitePermissions_GrantedBy_SWIMasterSitePermissions)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<SWIMasterSitePermission> SWIMasterSitePermissions { get; set; } // SWIMasterSitePermissions.FK_SWIMasterSitePermissions_GrantedBy_SWIMasterSitePermissions
        /// <summary>
        /// Child UserRoles where [UserRoles].[UserId] point to this entity (FK_UserRoles_Users)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<UserRole> UserRoles { get; set; } // UserRoles.FK_UserRoles_Users

        // Foreign keys

        /// <summary>
        /// Parent Site pointed by [Users].([DefaultSiteId]) (FK_Users_Sites)
        /// </summary>
        public virtual Site Site { get; set; } // FK_Users_Sites

        public User()
        {
            ApprovalGroupUsers = new System.Collections.Generic.List<ApprovalGroupUser>();
            AssignedApprover = new System.Collections.Generic.List<ApprovalRequest>();
            RequestedBy = new System.Collections.Generic.List<ApprovalRequest>();
            AuthTokens = new System.Collections.Generic.List<AuthToken>();
            DocumentChanges = new System.Collections.Generic.List<DocumentChanx>();
            CheckedOutDocuments = new System.Collections.Generic.List<Document>();
            CreatedDocuments = new System.Collections.Generic.List<Document>();
            SWIMastersCreated = new System.Collections.Generic.List<SWIMaster>();
            SWIMasterSitePermissions = new System.Collections.Generic.List<SWIMasterSitePermission>();
            UserRoles = new System.Collections.Generic.List<UserRole>();
            InitializePartial();
        }

        partial void InitializePartial();
    }

}
// </auto-generated>
