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

    // ApprovalStatus
    public partial class ApprovalStatu
    {
        public int Id { get; set; } // Id (Primary key)
        public string Name { get; set; } // Name (length: 50)
        public string Description { get; set; } // Description (length: 255)
        public bool IsApproved { get; set; } // IsApproved
        public bool isPending { get; set; } // isPending
        public bool isRejected { get; set; } // isRejected
        public bool isCancelled { get; set; } // isCancelled

        // Reverse navigation

        /// <summary>
        /// Child ApprovalRequests where [ApprovalRequests].[ApprovalStatusId] point to this entity (FK_ApprovalRequests_ApprovalStatus)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<ApprovalRequest> ApprovalRequests { get; set; } // ApprovalRequests.FK_ApprovalRequests_ApprovalStatus

        public ApprovalStatu()
        {
            ApprovalRequests = new System.Collections.Generic.List<ApprovalRequest>();
            InitializePartial();
        }

        partial void InitializePartial();
    }

}
// </auto-generated>