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

    // DocumentLinks
    public partial class DocumentLink
    {
        public int Id { get; set; } // Id (Primary key)
        public int DocumentAd { get; set; } // DocumentAd
        public int DocumentBId { get; set; } // DocumentBId
        public string LinkNotes { get; set; } // LinkNotes (length: 255)

        // Foreign keys

        /// <summary>
        /// Parent Document pointed by [DocumentLinks].([DocumentAd]) (FK_DocumentLinks_Documents)
        /// </summary>
        public virtual Document Document_DocumentAd { get; set; } // FK_DocumentLinks_Documents
        /// <summary>
        /// Parent Document pointed by [DocumentLinks].([DocumentBId]) (FK_DocumentLinks_Documents1)
        /// </summary>
        public virtual Document DocumentB { get; set; } // FK_DocumentLinks_Documents1

        public DocumentLink()
        {
            InitializePartial();
        }

        partial void InitializePartial();
    }

}
// </auto-generated>