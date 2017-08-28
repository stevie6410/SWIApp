using System.Threading.Tasks;
using RC.SWI.Common.DTO;

namespace RC.SWI.Services.Interfaces
{
    public interface INotificationService
    {
        Task<NotificationDTO> Create(NotificationRequestDTO request);
    }
}