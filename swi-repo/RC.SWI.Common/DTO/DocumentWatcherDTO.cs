using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class DocumentWatcherDTO
    {
        public int Id { get; set; }
        public DocumentDTO Document { get; set; }
        public string Username { get; set; }
        public string ClientId { get; set; }
        public string Notes { get; set; }

        public DocumentWatcherDTO(DocumentWatcher dw)
        {
            if (dw == null) return;
            Id = dw.Id;
            Document = new DocumentDTO(dw.Document);
            Username = dw.Username;
            ClientId = dw.ClientId;
            Notes = dw.Notes;
        }
    }
}
