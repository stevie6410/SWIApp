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

    // RolePermissions
    public partial class RolePermission
    {
        public int Id { get; set; } // Id (Primary key)
        public int RoleId { get; set; } // RoleId
        public int PermissionId { get; set; } // PermissionId

        // Foreign keys

        /// <summary>
        /// Parent Permission pointed by [RolePermissions].([PermissionId]) (FK_RolePermissions_Permissions)
        /// </summary>
        public virtual Permission Permission { get; set; } // FK_RolePermissions_Permissions
        /// <summary>
        /// Parent Role pointed by [RolePermissions].([RoleId]) (FK_RolePermissions_Roles)
        /// </summary>
        public virtual Role Role { get; set; } // FK_RolePermissions_Roles

        public RolePermission()
        {
            InitializePartial();
        }

        partial void InitializePartial();
    }

}
// </auto-generated>
