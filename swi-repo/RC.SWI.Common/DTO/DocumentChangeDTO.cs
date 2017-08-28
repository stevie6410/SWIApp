using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class DocumentChangeDTO
    {
        private int DocumentId { get; set; }
        private System.DateTime ChangedOn { get; set; }
        private string ChangedBy { get; set; }
        private string ChangeNotes { get; set; }
        private string ChangeOperation { get; set; }

        public DocumentChangeDTO(DocumentChanx c)
        {
            DocumentId = c.DocumentId;
            ChangedOn = c.ChangedOn;
            ChangedBy = c.ChangedBy;
            ChangeNotes = c.ChangeNotes;
            ChangeOperation = c.ChangeOperation;
        }
    }
}