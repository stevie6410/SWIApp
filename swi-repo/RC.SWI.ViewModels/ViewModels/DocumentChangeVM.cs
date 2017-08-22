using RC.SWI.Entities;

namespace RC.SWI.ViewModels
{
    public class DocumentChangeVM
    {
        public int DocumentId { get; set; }
        public System.DateTime ChangedOn { get; set; }
        public string ChangedBy { get; set; } 
        public string ChangeNotes { get; set; } 
        public string ChangeOperation { get; set; }

        public DocumentChangeVM(DocumentChanx c)
        {
            DocumentId = c.DocumentId;
            ChangedOn = c.ChangedOn;
            ChangedBy = c.ChangedBy;
            ChangeNotes = c.ChangeNotes;
            ChangeOperation = c.ChangeOperation;
        }
    }
}