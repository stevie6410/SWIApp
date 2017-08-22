using RC.SWI.Common.ExtMethods;
using RC.SWI.Entities;
using RC.SWI.ViewModels.Interfaces;
using RC.SWI.ViewModels.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RC.SWI.ViewModels
{
    public class DocumentVM: IDocumentVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public bool CheckedOut { get; set; }
        public string CheckedOutBy { get; set; }
        public DateTime? CheckedOutOn { get; set; }
        public FileVM File { get; set; }
        public string Hash { get; set; }
        public string ClientHash { get; set; }
        public DateTime Timestamp { get; set; }
        public int FileSize { get; set; }
        public List<DocumentPartLinkVM> DocumentPartLinks { get; set; }
        public List<DocumentChangeVM> DocumentChanges { get; set; }
        
        public DocumentVM(Document doc, bool includeFile = false)
        {
            if (doc != null)
            {
                Id = doc.Id;
                Name = doc.Name;
                CreatedOn = doc.CreatedOn;
                CreatedBy = doc.CreatedBy;
                CheckedOut = doc.CheckedOut;
                CheckedOutBy = doc.CheckedOutBy;
                CheckedOutOn = doc.CheckedOutOn;
                DocumentPartLinks = doc.DocumentPartLinks.Select(pl => new DocumentPartLinkVM(pl)).ToList();
                DocumentChanges = doc.DocumentChanges.Select(dc => new DocumentChangeVM(dc)).ToList();

                if (doc.DocumentFile != null)
                {
                    if (doc.DocumentFile.Data != null && includeFile) File = new FileVM(Encoding.UTF8.GetString(doc.DocumentFile.Data.Decompress()));
                    Hash = doc.DocumentFile.Hash;
                    FileSize = doc.DocumentFile.FileSize;
                    ClientHash = doc.DocumentFile.ClientHash;
                    Timestamp = doc.DocumentFile.Timestamp;
                }
            }
        }
    }
}
