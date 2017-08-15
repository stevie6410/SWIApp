using RC.SWI.ViewModels.ViewModels;
using System;
using System.Collections.Generic;

namespace RC.SWI.ViewModels.Interfaces
{
    public interface IDocumentVM
    {
        bool CheckedOut { get; set; }
        string CheckedOutBy { get; set; }
        DateTime? CheckedOutOn { get; set; }
        string CreatedBy { get; set; }
        DateTime CreatedOn { get; set; }
        //List<DocumentLink> DocumentLinks { get; set; }
        //List<DocumentPartLink> DocumentPartLinks { get; set; }
        //DocumentType DocumentType { get; set; }
        FileVM File { get; set; }
        int FileSize { get; set; }
        string Hash { get; set; }
        int Id { get; set; }
        string Name { get; set; }
    }
}