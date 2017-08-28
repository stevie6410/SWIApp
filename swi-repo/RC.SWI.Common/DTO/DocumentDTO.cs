using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RC.SWI.Common.ExtMethods;
using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class DocumentDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public bool CheckedOut { get; set; }
        public string CheckedOutBy { get; set; }
        public DateTime? CheckedOutOn { get; set; }
        public FileDTO File { get; set; }
        public string Hash { get; set; }
        public string ClientHash { get; set; }
        public DateTime Timestamp { get; set; }
        public int FileSize { get; set; }
        public List<DocumentPartLinkDTO> DocumentPartLinks { get; set; }
        public List<DocumentChangeDTO> DocumentChanges { get; set; }
        
        public DocumentDTO(Document doc, bool includeFile = false)
        {
            if (doc == null) return;
            Id = doc.Id;
            Name = doc.Name;
            CreatedOn = doc.CreatedOn;
            CreatedBy = doc.CreatedBy;
            CheckedOut = doc.CheckedOut;
            CheckedOutBy = doc.CheckedOutBy;
            CheckedOutOn = doc.CheckedOutOn;
            DocumentPartLinks = doc.DocumentPartLinks.Select(pl => new DocumentPartLinkDTO(pl)).ToList();
            DocumentChanges = doc.DocumentChanges.Select(dc => new DocumentChangeDTO(dc)).ToList();

            if (doc.DocumentFile == null) return;
            if (doc.DocumentFile.Data != null && includeFile) File = new FileDTO(Encoding.UTF8.GetString(doc.DocumentFile.Data.Decompress()));
            Hash = doc.DocumentFile.Hash;
            FileSize = doc.DocumentFile.FileSize;
            ClientHash = doc.DocumentFile.ClientHash;
            Timestamp = doc.DocumentFile.Timestamp;
        }
    }
}
