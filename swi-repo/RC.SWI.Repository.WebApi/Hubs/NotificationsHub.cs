using Microsoft.AspNet.SignalR;
using RC.SWI.ViewModels.ViewModels;

namespace RC.SWI.Repository.WebApi.Hubs
{
    public class NotificationsHub : Hub
    {       
        public void NotifyClient(string clientId, NotificationVM notification)
        {
            Clients.Client(clientId).notify();
        }
    }
}