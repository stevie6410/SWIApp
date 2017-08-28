using RC.SWI.ViewModels.ViewModels;
using System;

namespace RC.SWI.ViewModels.Interfaces
{
    public interface IDocumentVm
    {
        bool CheckedOut { get; set; }
        string CheckedOutBy { get; set; }
        DateTime? CheckedOutOn { get; set; }
        string CreatedBy { get; set; }
        DateTime CreatedOn { get; set; }
        FileVM File { get; set; }
        int FileSize { get; set; }
        string Hash { get; set; }
        int Id { get; set; }
        string Name { get; set; }
    }
}