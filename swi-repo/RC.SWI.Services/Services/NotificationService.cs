using System;
using System.Threading.Tasks;
using RC.SWI.Common.DTO;
using RC.SWI.Entities;
using RC.SWI.Services.Interfaces;

namespace RC.SWI.Services
{
    public class NotificationService : INotificationService
    {
        private readonly SWIRepository _db;

        public NotificationService()
        {
            _db = new SWIRepository();
        }
        
        async Task<NotificationDTO> Get(int id)
        {
            // Get notification from the database
            var notification = await _db.Notifications.FindAsync(id);

            // Convert to VM
            return new NotificationDTO(notification);
        }
        
        public async Task<NotificationDTO> Create(NotificationRequestDTO request)
        {
            // Build the notification
            var notification = new Notification
            {
                Message = request.Message,
                Type = request.Type,
                Username = request.Username,
                SentOn = DateTime.UtcNow,
                Dismissed = false
            };

            // Add the notification to the database
            _db.Notifications.Add(notification);

            // Save Changes
            await _db.SaveChangesAsync();

            // Return View Model
            return new NotificationDTO(notification);
        }
    }
}