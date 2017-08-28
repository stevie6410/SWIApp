using System;
using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class NotificationDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public bool Dismissed { get; set; }
        public DateTime SentOn { get; set; } 

        public NotificationDTO(Notification n)
        {
            if (n == null) return;
            Id = n.Id;
            Username = n.Username;
            Message = n.Message;
            Type = n.Type;
            Dismissed = n.Dismissed;
            SentOn = n.SentOn;
        }
    }
}
