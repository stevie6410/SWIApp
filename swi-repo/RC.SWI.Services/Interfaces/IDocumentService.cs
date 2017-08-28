using System.Collections.Generic;
using System.Threading.Tasks;
using RC.SWI.Common.DTO;

namespace RC.SWI.Services.Interfaces
{
    public interface IDocumentService
    {
        Task<List<DocumentSimpleDTO>> All();
        Task<DocumentDTO> AttatchFile(int docId, byte[] file, string username, string clientHash = null, string notes = null);
        Task<DocumentDTO> CheckIn(CheckInRequestDTO request, string username);
        Task<DocumentDTO> CheckOut(int id, string username);
        Task<DocumentDTO> Create(CreateDocumentDTO docUpdate);
        Task<DocumentDTO> Get(int id);
        Task<DocumentDTO> LinkToDocument(DocumentUpdateDTO a, DocumentUpdateDTO b, string notes);
        Task<DocumentPartLinkDTO> LinkToPart(int docId, DocumentPartLinkDTO partLink, string username);
        Task<DocumentDTO> Update(DocumentUpdateDTO doc);
    }
}