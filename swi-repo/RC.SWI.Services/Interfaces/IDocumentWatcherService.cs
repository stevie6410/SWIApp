using System.Threading.Tasks;
using RC.SWI.Common.DTO;

namespace RC.SWI.Services.Interfaces
{
    public interface IDocumentWatcherService
    {
        Task<DocumentWatcherDTO> CreateWatcher(CreateDocumentWatcherRequestDTO request);
        Task SendNotifications(CheckInRequestDTO checkInRequest);
    }
}