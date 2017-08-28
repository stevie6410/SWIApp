namespace RC.SWI.Common.DTO
{
    public class CreateDocumentWatcherRequestDTO
    {
        public int DocumentId { get; set; }
        public string Username { get; set; }
        public string ClientId { get; set; }
        public string Notes { get; set; }
    }
}
