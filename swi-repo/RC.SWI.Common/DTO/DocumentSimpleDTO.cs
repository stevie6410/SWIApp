using System;
using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class DocumentSimpleDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public bool CheckedOut { get; set; }
        public string CheckedOutBy { get; set; }
        public DateTime? CheckedOutOn { get; set; }
        public string Hash { get; set; }
        public int FileSize { get; set; }
        public DocumentSimpleDTO(Document doc)
        {
            if (doc == null) return;
            Id = doc.Id;
            Name = doc.Name;
            CreatedOn = doc.CreatedOn;
            CreatedBy = doc.CreatedBy;
            CheckedOut = doc.CheckedOut;
            CheckedOutBy = doc.CreatedBy;
            CheckedOutOn = doc.CheckedOutOn;

            if (doc.DocumentFile == null) return;
            Hash = doc.DocumentFile.Hash;
            FileSize = doc.DocumentFile.FileSize;
        }
    }
}
