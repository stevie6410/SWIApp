using RC.SWI.Entities;

namespace RC.SWI.ViewModels.ViewModels
{
    public class DocumentWatcherVM
    {
        public int Id { get; set; }
        public DocumentVM Document { get; set; }
        public string Username { get; set; }
        public string ClientId { get; set; }
        public string Notes { get; set; }

        public DocumentWatcherVM(DocumentWatcher dw)
        {
            Id = dw.Id;
            Document = new DocumentVM(dw.Document);
            Username = dw.Username;
            ClientId = dw.ClientId;
            Notes = dw.Notes;

        }
    }
}
