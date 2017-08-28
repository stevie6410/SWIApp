using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using RC.SWI.Common.DTO;
using RC.SWI.Entities;
using RC.SWI.Services.Interfaces;

namespace RC.SWI.Services
{
    /// <summary>
    /// Manages the user requests for a document to be watched while it is checked out by another user
    /// </summary>
    public class DocumentWatcherService : IDocumentWatcherService
    {
        private readonly SWIRepository _db;
        private readonly INotificationService _notificationService;

        public DocumentWatcherService(INotificationService notificationService)
        {
            _db = new SWIRepository();
            _notificationService = notificationService;
        }

        public async Task<DocumentWatcherDTO> CreateWatcher(CreateDocumentWatcherRequestDTO request)
        {
            // Get the document to be watched
            var doc = await _db.Documents.FindAsync(request.DocumentId);

            // Build the watcher object
            var watcher = new DocumentWatcher
            {
                Notes = request.Notes,
                ClientId = request.ClientId,
                Username = request.Username
            };
            doc?.DocumentWatchers.Add(watcher);

            // Save Changes
            await _db.SaveChangesAsync();

            // Fetch the watcher from the database
            var result = await _db.DocumentWatchers.FindAsync(watcher.Id);
            return new DocumentWatcherDTO(result);
        }

        public async Task SendNotifications(CheckInRequestDTO checkInRequest)
        {
            // Check for active watchers
            var watchers = await _db.DocumentWatchers.Where(w => w.Document.Id == checkInRequest.DocId && w.Active).ToListAsync();

            // End if there are no watchers

            if (watchers == null) return;

            // Loop through each watcher and send notificaions
            foreach (var watcher in watchers)
            {
                // Build notification object
                var notification = new NotificationRequestDTO
                {
                    Message = $"Document '{watcher.Document.Name}' is now available to be checked out",
                    Type = "Document Watcher",
                    Username = watcher.Username
                };
            }
        }
    }
}