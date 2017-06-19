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

    // ApprovalGroupUsers
    public partial class ApprovalGroupUser
    {
        public int Id { get; set; } // Id (Primary key)
        public int ApprovalGroupId { get; set; } // ApprovalGroupId
        public int UserId { get; set; } // UserId

        // Foreign keys

        /// <summary>
        /// Parent ApprovalGroup pointed by [ApprovalGroupUsers].([ApprovalGroupId]) (FK_ApprovalGroupUsers_ApprovalGroup_Users)
        /// </summary>
        public virtual ApprovalGroup ApprovalGroup { get; set; } // FK_ApprovalGroupUsers_ApprovalGroup_Users
        /// <summary>
        /// Parent User pointed by [ApprovalGroupUsers].([UserId]) (FK_ApprovalGroupUsers_Users)
        /// </summary>
        public virtual User User { get; set; } // FK_ApprovalGroupUsers_Users

        public ApprovalGroupUser()
        {
            InitializePartial();
        }

        partial void InitializePartial();
    }

}
// </auto-generated>