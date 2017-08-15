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
    public partial class ApprovalGroupUserConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<ApprovalGroupUser>
    {
        public ApprovalGroupUserConfiguration()
            : this("dbo")
        {
        }

        public ApprovalGroupUserConfiguration(string schema)
        {
            ToTable("ApprovalGroupUsers", schema);
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName(@"Id").HasColumnType("int").IsRequired().HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(x => x.ApprovalGroupId).HasColumnName(@"ApprovalGroupId").HasColumnType("int").IsRequired();
            Property(x => x.Username).HasColumnName(@"Username").HasColumnType("varchar").IsRequired().IsUnicode(false).HasMaxLength(100);

            // Foreign keys
            HasRequired(a => a.ApprovalGroup).WithMany(b => b.Users).HasForeignKey(c => c.ApprovalGroupId).WillCascadeOnDelete(false); // FK_ApprovalGroupUsers_ApprovalGroup_Users
            InitializePartial();
        }
        partial void InitializePartial();
    }

}
// </auto-generated>
