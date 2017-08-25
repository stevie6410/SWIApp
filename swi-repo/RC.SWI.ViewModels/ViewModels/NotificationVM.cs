using RC.SWI.Entities;
using System;

namespace RC.SWI.ViewModels.ViewModels
{
    public class NotificationVM
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public bool Dismissed { get; set; }
        public DateTime SentOn { get; set; } 

        public NotificationVM(Notification n)
        {
            Id = n.Id;
            Username = n.Username;
            Message = n.Message;
            Type = n.Type;
            Dismissed = n.Dismissed;
            SentOn = n.SentOn;
        }
    }
}
