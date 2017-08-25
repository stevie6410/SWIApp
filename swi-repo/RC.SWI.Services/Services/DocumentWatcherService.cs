using RC.SWI.Entities;
using RC.SWI.ViewModels;
using RC.SWI.ViewModels.ViewModels;
using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace RC.SWI.Services.Services
{
    public class DocumentWatcherService
    {
        private readonly SWIRepository db;
        private readonly NotificationService notificationService;

        public DocumentWatcherService()
        {
            db = new SWIRepository();
            notificationService = new NotificationService();
        }

        public async Task<DocumentWatcherVM> CreateWatcher(CreateDocumentWatcherRequest request)
        {
            // Get the document to be watched
            var doc = await db.Documents.FindAsync(request.DocumentId);

            // Build the watcher object
            var watcher = new DocumentWatcher();
            watcher.Notes = request.Notes;
            watcher.ClientId = request.ClientId;
            watcher.Username = request.Username;
            doc.DocumentWatchers.Add(watcher);

            // Save Changes
            await db.SaveChangesAsync();

            // Fetch the watcher from the database
            var result = await db.DocumentWatchers.FindAsync(watcher.Id);
            return new DocumentWatcherVM(result);
        }

        public async Task SendNotifications(CheckInRequest checkInRequest)
        {
            // Check for active watchers
            var watchers = await db.DocumentWatchers.Where(w => w.Document.Id == checkInRequest.DocId && w.Active == true).ToListAsync();

            // End if there are no watchers
            if (watchers == null) return;

            // Loop through each watcher and send notificaions
            foreach (var watcher in watchers)
            {
                // Build notification
                var notification = new NotificationRequest();
                notification.Message = string.Format("Document '{0}' is now available to be checked out", watcher.Document.Name);
                notification.Type = "Document Watcher";
                notification.Username = watcher.Username;
                //await notificationService.Notify(notification);
            }
        }
    }

    public class NotificationService
    {
        private readonly SWIRepository db;

        public NotificationService()
        {
            db = new SWIRepository();
        }




        private async Task<UserNotification> Create(NotificationRequest request)
        {
            // Build the notification
            var notification = new UserNotification();
            notification.Message = request.Message;
            notification.Type = request.Type;
            notification.Username = request.Username;
            notification.SentOn = DateTime.UtcNow;
            notification.Dismissed = false;

            // Add the notification to the database
            db.UserNotifications.Add(notification);

            // Save Changes
            await db.SaveChangesAsync();

            // Return View Model
            return notification;
        }
    }

    public class NotificationRequest
    {
        public string Username { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
    }

    public class UserNotificationVM
    {
        public int Id { get; set; } // Id (Primary key)
        public string Username { get; set; } // Username (length: 100)
        public string Message { get; set; } // Message (length: 1000)
        public string Type { get; set; } // Type (length: 100)
        public bool Dismissed { get; set; } // Dismissed
        public DateTime SentOn { get; set; } // SentOn

        public UserNotificationVM(UserNotification n)
        {
            Id = n.Id;
            Username = n.Username;
            Message = n.Message;
            Type = n.Type;
            Dismissed = n.Dismissed;
            SentOn = n.SentOn;
        }

    }

    public class CreateDocumentWatcherRequest
    {
        public int DocumentId { get; set; }
        public string Username { get; set; }
        public string ClientId { get; set; }
        public string Notes { get; set; }
    }

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
