using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using RC.SWI.Common.DTO;

namespace RC.SWI.Services.Interfaces
{
    public interface ISWIService
    {
        Task<SWIMasterDTO> AttatchSwiFile(Guid swiRevisionId, string clientHash, byte[] swiFile, string username, string message);
        Task<SWIMasterDTO> CreateMaster(CreateSWIMasterDTO createMaster);
        Task<SWIMasterDTO> GetMaster(Guid id);
        Task<List<SWIMasterDTO>> GetMasters();
        Task<List<SWIMasterDTO>> SearchMasters(int swiNumber = 0, string title = "");
        Task<SWIMasterDTO> UpRev(CreateSWIRevisionDTO createRev);
    }
}