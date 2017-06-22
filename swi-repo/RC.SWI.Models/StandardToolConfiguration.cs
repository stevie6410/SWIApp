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

    // StandardTools
    public partial class StandardToolConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<StandardTool>
    {
        public StandardToolConfiguration()
            : this("swi")
        {
        }

        public StandardToolConfiguration(string schema)
        {
            ToTable("StandardTools", schema);
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName(@"Id").HasColumnType("int").IsRequired().HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(x => x.Name).HasColumnName(@"Name").HasColumnType("varchar").IsRequired().IsUnicode(false).HasMaxLength(255);
            Property(x => x.Image).HasColumnName(@"Image").HasColumnType("varchar(max)").IsRequired().IsUnicode(false);
            Property(x => x.HasCarePoint).HasColumnName(@"HasCarePoint").HasColumnType("bit").IsRequired();
            Property(x => x.CarePoint).HasColumnName(@"CarePoint").HasColumnType("varchar").IsOptional().IsUnicode(false).HasMaxLength(255);
            Property(x => x.SWIMasterId).HasColumnName(@"SWIMasterId").HasColumnType("uniqueidentifier").IsOptional();

            // Foreign keys
            HasOptional(a => a.SWIMaster).WithMany(b => b.StandardTools).HasForeignKey(c => c.SWIMasterId).WillCascadeOnDelete(false); // FK_StandardTools_SWIMasters
            InitializePartial();
        }
        partial void InitializePartial();
    }

}
// </auto-generated>
