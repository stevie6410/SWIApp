using RC.SWI.Entities;
using RC.SWI.ViewModels.Interfaces;
using RC.SWI.ViewModels.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RC.SWI.ViewModels
{
    public class DocumentSimpleVM
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
        public DocumentSimpleVM(Document doc)
        {
            if (doc != null)
            {
                Id = doc.Id;
                Name = doc.Name;
                CreatedOn = doc.CreatedOn;
                CreatedBy = new UserVM(doc.CreatedBy).FullName;
                CheckedOut = doc.CheckedOut;
                CheckedOutBy = new UserVM(doc.CreatedBy).FullName;
                CheckedOutOn = doc.CheckedOutOn;

                if (doc.DocumentFile != null)
                {
                    Hash = doc.DocumentFile.Hash;
                    FileSize = doc.DocumentFile.FileSize;
                }
            }
        }
    }
}
