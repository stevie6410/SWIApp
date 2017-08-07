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

    // SWITypes
    public partial class SWIType
    {
        public int Id { get; set; } // Id (Primary key)
        public string Name { get; set; } // Name (length: 255)
        public string Description { get; set; } // Description (length: 255)
        public int? AppConfigurationId { get; set; } // AppConfigurationId

        // Reverse navigation

        /// <summary>
        /// Child SWIMasters where [SWIMasters].[SWITypeId] point to this entity (FK_SWIMasters_SWITypes)
        /// </summary>
        public virtual System.Collections.Generic.ICollection<SWIMaster> SWIMasters { get; set; } // SWIMasters.FK_SWIMasters_SWITypes

        // Foreign keys

        /// <summary>
        /// Parent AppConfiguration pointed by [SWITypes].([AppConfigurationId]) (FK_SWITypes_AppConfigurations)
        /// </summary>
        public virtual AppConfiguration AppConfiguration { get; set; } // FK_SWITypes_AppConfigurations

        public SWIType()
        {
            SWIMasters = new System.Collections.Generic.List<SWIMaster>();
            InitializePartial();
        }

        partial void InitializePartial();
    }

}
// </auto-generated>
