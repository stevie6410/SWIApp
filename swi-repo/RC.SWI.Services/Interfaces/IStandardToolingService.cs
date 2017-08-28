using System.Collections.Generic;
using System.Threading.Tasks;
using RC.SWI.Common.DTO;

namespace RC.SWI.Services.Interfaces
{
    public interface IStandardToolingService
    {
        Task<StandardToolDTO> Create(CreateStandardToolDTO tool);
        Task<bool> Delete(int id);
        Task<IList<StandardToolDTO>> Get();
        Task<StandardToolDTO> Get(int id);
        Task<IList<StandardToolDTO>> Search(string term = "", string toolNumber = "", string hasCarePoint = "", string hasLinkedSwi = "");
        Task<StandardToolDTO> Update(StandardToolDTO toolVm);
    }
}