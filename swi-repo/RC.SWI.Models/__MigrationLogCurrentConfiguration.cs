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

    // __MigrationLogCurrent
    public partial class __MigrationLogCurrentConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<__MigrationLogCurrent>
    {
        public __MigrationLogCurrentConfiguration()
            : this("dbo")
        {
        }

        public __MigrationLogCurrentConfiguration(string schema)
        {
            ToTable("__MigrationLogCurrent", schema);
            HasKey(x => new { x.migration_id, x.script_checksum, x.script_filename, x.complete_dt, x.applied_by, x.deployed });

            Property(x => x.migration_id).HasColumnName(@"migration_id").HasColumnType("uniqueidentifier").IsRequired().HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None);
            Property(x => x.script_checksum).HasColumnName(@"script_checksum").HasColumnType("nvarchar").IsRequired().HasMaxLength(64).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None);
            Property(x => x.script_filename).HasColumnName(@"script_filename").HasColumnType("nvarchar").IsRequired().HasMaxLength(255).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None);
            Property(x => x.complete_dt).HasColumnName(@"complete_dt").HasColumnType("datetime2").IsRequired().HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None);
            Property(x => x.applied_by).HasColumnName(@"applied_by").HasColumnType("nvarchar").IsRequired().HasMaxLength(100).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None);
            Property(x => x.deployed).HasColumnName(@"deployed").HasColumnType("tinyint").IsRequired().HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None);
            InitializePartial();
        }
        partial void InitializePartial();
    }

}
// </auto-generated>
