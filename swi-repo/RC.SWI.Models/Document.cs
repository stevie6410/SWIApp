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

    // Documents
    public partial class Document
    {
        public int Id { get; set; } // Id (Primary key)
        public int DocumentTypeId { get; set; } // DocumentTypeId
        public string Name { get; set; } // Name (length: 255)
        public System.DateTime CreatedOn { get; set; } // CreatedOn
        public int CreatedById { get; set; } // CreatedById
        public string AppVersion { get; set; } // AppVersion (length: 10)
        public bool CheckedOut { get; set; } // CheckedOut
        public int? CheckedOutById { get; set; } // CheckedOutById
        public System.DateTime? CheckedOutOn { get; set; } // CheckedOutOn
        public int? DocumentFileId { get; set; } // DocumentFileId

        // Reverse navigation

        /// <summary>
        /// Child ApprovalRequests where [ApprovalRequests].[DocumentId] point to this entity (FK_ApprovalRequests_Documents)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<ApprovalRequest> ApprovalRequests { get; set; } // ApprovalRequests.FK_ApprovalRequests_Documents
        /// <summary>
        /// Child DocumentChanges where [DocumentChanges].[DocumentId] point to this entity (FK_DocumentChanges_Documents)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<DocumentChanx> DocumentChanges { get; set; } // DocumentChanges.FK_DocumentChanges_Documents
        /// <summary>
        /// Child DocumentLinks where [DocumentLinks].[DocumentAd] point to this entity (FK_DocumentLinks_Documents)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<DocumentLink> DocumentAd { get; set; } // DocumentLinks.FK_DocumentLinks_Documents
        /// <summary>
        /// Child DocumentLinks where [DocumentLinks].[DocumentBId] point to this entity (FK_DocumentLinks_Documents1)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<DocumentLink> DocumentB { get; set; } // DocumentLinks.FK_DocumentLinks_Documents1
        /// <summary>
        /// Child DocumentPartLinks where [DocumentPartLinks].[DocumentId] point to this entity (FK_PartLinks_Docs)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<DocumentPartLink> DocumentPartLinks { get; set; } // DocumentPartLinks.FK_PartLinks_Docs
        /// <summary>
        /// Child SWIRevisions where [SWIRevisions].[DocumentId] point to this entity (FK_SWIRevisions_Documents)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<SWIRevision> SWIRevisions { get; set; } // SWIRevisions.FK_SWIRevisions_Documents

        // Foreign keys

        /// <summary>
        /// Parent DocumentFile pointed by [Documents].([DocumentFileId]) (FK_Docs_Files)
        /// </summary>
        public virtual DocumentFile DocumentFile { get; set; } // FK_Docs_Files
        /// <summary>
        /// Parent DocumentType pointed by [Documents].([DocumentTypeId]) (FK_Documents_DocumentTypes)
        /// </summary>
        public virtual DocumentType DocumentType { get; set; } // FK_Documents_DocumentTypes
        /// <summary>
        /// Parent User pointed by [Documents].([CheckedOutById]) (FK_Documents_CheckedOutBy_CheckedOutDocuments)
        /// </summary>
        public virtual User CheckedOutBy { get; set; } // FK_Documents_CheckedOutBy_CheckedOutDocuments
        /// <summary>
        /// Parent User pointed by [Documents].([CreatedById]) (FK_Documents_CreatedBy_CreatedDocuments)
        /// </summary>
        public virtual User CreatedBy { get; set; } // FK_Documents_CreatedBy_CreatedDocuments

        public Document()
        {
            ApprovalRequests = new System.Collections.Generic.List<ApprovalRequest>();
            DocumentChanges = new System.Collections.Generic.List<DocumentChanx>();
            DocumentAd = new System.Collections.Generic.List<DocumentLink>();
            DocumentB = new System.Collections.Generic.List<DocumentLink>();
            DocumentPartLinks = new System.Collections.Generic.List<DocumentPartLink>();
            SWIRevisions = new System.Collections.Generic.List<SWIRevision>();
            InitializePartial();
        }

        partial void InitializePartial();
    }

}
// </auto-generated>