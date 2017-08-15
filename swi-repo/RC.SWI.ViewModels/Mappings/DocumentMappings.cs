using RC.SWI.Common.ExtMethods;
using RC.SWI.Entities;
using RC.SWI.ViewModels.Interfaces;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.ViewModels.Mappings
{
    public static class DocumentMappings
    {
        public static Document ToDocument(this IDocuemntUpdateVM docUpdate)
        {
            var doc = new Document();
            doc.Name = docUpdate.Name;
            doc.CreatedBy = docUpdate.Username;
            doc.DocumentTypeId = docUpdate.DocumentTypeId;
            doc.CheckedOutBy = docUpdate.Username;
            doc.AppVersion = docUpdate.AppVersion;
            doc.CreatedOn = DateTime.Now;
            doc.CheckedOut = true;
            doc.CheckedOutOn = DateTime.Now;

            return doc;
        }
    }
}
