using System.Collections.Generic;
using System.Threading.Tasks;
using RC.SWI.ViewModels.Interfaces;
using RC.SWI.ViewModels;

namespace RC.SWI.Services.Interfaces
{
    public interface IDocumentService
    {
        Task<List<DocumentVM>> GetDocuments();
        Task<IDocumentVM> GetDocument(int id);
        Task<IDocumentVM> CreateDocument(IDocuemntUpdateVM doc);
        Task<IDocumentVM> UpdateDocument(IDocuemntUpdateVM doc);
        Task<IDocumentVM> LinkDocuments(IDocuemntUpdateVM a, IDocuemntUpdateVM b, string notes);
        Task<IDocumentVM> LinkDocumentToPart(IDocuemntUpdateVM doc, string partNumber, string revision, string erpSystem);
    }
}
