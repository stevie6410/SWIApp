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

    // SWIRevisions
    public partial class SWIRevisionConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<SWIRevision>
    {
        public SWIRevisionConfiguration()
            : this("swi")
        {
        }

        public SWIRevisionConfiguration(string schema)
        {
            ToTable("SWIRevisions", schema);
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName(@"Id").HasColumnType("uniqueidentifier").IsRequired().HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None);
            Property(x => x.RevisionNumber).HasColumnName(@"RevisionNumber").HasColumnType("int").IsRequired();
            Property(x => x.Released).HasColumnName(@"Released").HasColumnType("bit").IsRequired();
            Property(x => x.MasterId).HasColumnName(@"MasterId").HasColumnType("uniqueidentifier").IsRequired();
            Property(x => x.AppVersion).HasColumnName(@"AppVersion").HasColumnType("varchar").IsRequired().IsUnicode(false).HasMaxLength(50);
            Property(x => x.CreatedOn).HasColumnName(@"CreatedOn").HasColumnType("datetime2").IsRequired();
            Property(x => x.ModifiedOn).HasColumnName(@"ModifiedOn").HasColumnType("datetime2").IsRequired();
            Property(x => x.DocumentId).HasColumnName(@"DocumentId").HasColumnType("int").IsOptional();
            Property(x => x.SwiFileId).HasColumnName(@"SwiFileId").HasColumnType("nvarchar").IsOptional().HasMaxLength(255);

            // Foreign keys
            HasOptional(a => a.Document).WithMany(b => b.SWIRevisions).HasForeignKey(c => c.DocumentId).WillCascadeOnDelete(false); // FK_SWIRevisions_Documents
            HasRequired(a => a.SWIMaster).WithMany(b => b.SWIRevisions).HasForeignKey(c => c.MasterId).WillCascadeOnDelete(false); // FK_SWIRevisions_SWIMasters
            InitializePartial();
        }
        partial void InitializePartial();
    }

}
// </auto-generated>
